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
import { toast } from '@/hooks/use-toast';
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
        getValues,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: props.initialValues,
    });

    const onSubmit = (data: FormValues) => {
        props.onSubmit(data);
        toast({
            variant: 'default',
            title: props.isUpdate ? 'Exam updated successfully' : 'Exam created successfully',
        });
    };

    return (
        <Sheet open={props.open} onOpenChange={(v) => props.setOpen(v)}>
            <SheetContent className="flex flex-col h-full sm:max-w-lg">
                <SheetHeader className="text-left">
                    <SheetTitle>{props.isUpdate ? 'Update Exam' : 'Create Exam'}</SheetTitle>
                    <SheetDescription>
                        {props.isUpdate
                            ? 'Update the exam by providing necessary info.'
                            : 'Add a new exam by providing necessary info.'}
                    </SheetDescription>
                </SheetHeader>

                <form id="exams-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-auto">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="name">Exam Name</Label>
                        <Input
                            id="name"
                            placeholder="Exam Name"
                            {...register('name', { required: 'Exam name is required' })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="audience">Audience</Label>
                        <Input
                            id="audience"
                            placeholder="Audience"
                            {...register('audience', { required: 'Audience is required' })}
                        />
                        {errors.audience && <p className="text-red-500 text-sm">{errors.audience.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="date">Exam Date</Label>
                        <DateTimePicker
                            date={getValues('date')}
                            setDate={(date) => setValue('date', date)}
                            {...register('date', { required: 'Exam date is required' })}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                            id="comment"
                            placeholder="Comment"
                            {...register('comment', { required: 'Comment is required' })}
                        />
                        {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="examType">Exam Type</Label>
                        <Controller
                            name="examType"
                            control={control}
                            rules={{ required: 'Exam type is required' }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Exam Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="LETNY">LETNY</SelectItem>
                                            <SelectItem value="ZIMNY">ZIMNY</SelectItem>
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
                        Save changes
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
