import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export function CreateExamPage() {
    const [examDetails, setExamDetails] = useState({
        name: '',
        audience: '',
        date: '',
        comment: '',
        examType: 'RIADNY',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setExamDetails({ ...examDetails, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Submitted exam details:', examDetails);
    };

    return (
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">Create Exam</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Exam Name */}
                <div>
                    <Label htmlFor="name">Exam Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={examDetails.name}
                        onChange={handleChange}
                        placeholder="Enter exam name"
                        required
                    />
                </div>

                {/* Audience */}
                <div>
                    <Label htmlFor="audience">Audience</Label>
                    <Input
                        id="audience"
                        name="audience"
                        type="text"
                        value={examDetails.audience}
                        onChange={handleChange}
                        placeholder="Enter audience"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <Label htmlFor="date">Exam Date</Label>
                    <Input
                        id="date"
                        name="date"
                        type="datetime-local"
                        value={examDetails.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Comment */}
                <div>
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea
                        id="comment"
                        name="comment"
                        value={examDetails.comment}
                        onChange={handleChange}
                        placeholder="Enter exam comments"
                    />
                </div>

                {/* Exam Type */}
                <div>
                    <Label htmlFor="examType">Exam Type</Label>
                    <Select name="examType" value={examDetails.examType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="RIADNY">RIADNY</SelectItem>
                            <SelectItem value="EXTRA">EXTRA</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                        Create Exam
                    </Button>
                </div>
            </form>
        </div>
    );
}
