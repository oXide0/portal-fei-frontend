import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DateTimePicker } from './dateTimePicker';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ExamDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isUpdate?: boolean;
    initialValues?: FormValues;
    onSubmit: (data: FormValues) => Promise<void>;
}

interface FormValues {
    name: string;
    audience: string;
    date: Date;
    comment: string;
    examType: 'LETNY' | 'ZIMNY';
}

export function ExamDrawer(props: ExamDrawerProps) {
    const {
        control,
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: props.initialValues,
    });
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(props.initialValues?.date ?? undefined);

    useEffect(() => {
        if (selectedDate == null) return;
        setValue('date', selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        if (props.initialValues == null) return;
        reset(props.initialValues);
        setSelectedDate(props.initialValues?.date ?? undefined);
    }, [props.initialValues]);

    const onSubmit = (data: FormValues) => {
        props.onSubmit(data);
        setSelectedDate(undefined);
        reset();
    };

    return (
        <Sheet
            open={props.open}
            onOpenChange={(v) => {
                if (!v) reset();
                props.setOpen(v);
            }}
        >
            <SheetContent className="flex flex-col h-full sm:max-w-lg">
                <SheetHeader className="text-left">
                    <SheetTitle>{props.isUpdate ? 'Aktualizovať skúšku' : 'Vytvoriť skúšku'}</SheetTitle>
                    <SheetDescription>
                        {props.isUpdate
                            ? 'Aktualizujte skúšku poskytnutím potrebných informácií.'
                            : 'Pridajte novú skúšku poskytnutím potrebných informácií.'}
                    </SheetDescription>
                </SheetHeader>

                <form id="exams-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-auto">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="name">Názov skúšky</Label>
                        <Input
                            id="name"
                            placeholder="Názov skúšky"
                            {...register('name', { required: 'Názov skúšky je povinný' })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="audience">Miestnosť</Label>
                        <Input
                            id="audience"
                            placeholder="Miestnosť"
                            {...register('audience', { required: 'Miestnosť je povinné' })}
                        />
                        {errors.audience && <p className="text-red-500 text-sm">{errors.audience.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="date">Dátum skúšky</Label>
                        <DateTimePicker
                            date={selectedDate}
                            setDate={setSelectedDate}
                            {...register('date', { required: 'Dátum skúšky je povinný' })}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="comment">Komentár</Label>
                        <Textarea
                            id="comment"
                            placeholder="Komentár"
                            {...register('comment', { required: 'Komentár je povinný' })}
                        />
                        {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="examType">Typ skúšky</Label>
                        <Controller
                            name="examType"
                            control={control}
                            rules={{ required: 'Typ skúšky je povinný' }}
                            render={({ field }) => (
                                <Select value={field.value ?? ''} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Vyberte typ skúšky" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="LETNY">LETNÝ</SelectItem>
                                            <SelectItem value="ZIMNY">ZIMNÝ</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.examType && <p className="text-red-500 text-sm">{errors.examType.message}</p>}
                    </div>
                </form>

                <SheetFooter className="gap-2 sm:justify-start">
                    <Button form="exams-form" type="submit">
                        Uložiť zmeny
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Zatvoriť</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
