"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, BookOpen, Hash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
    createSubject,
    updateSubject,
    deleteSubject,
} from "@/actions/subject.action";

interface Subject {
    id: string;
    name: string;
}

export default function SubjectClient({
    initialData,
}: {
    initialData: Subject[];
}) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [subjectName, setSubjectName] = useState("");

    //* unified submit handler
    const handleSubmit = async () => {
        if (!subjectName.trim()) return toast.error("Subject name is required");

        setIsPending(true);
        try {
            const res = editingSubject
                ? await updateSubject(subjectName, editingSubject.id)
                : await createSubject(subjectName);

            if (!res.success) {
                toast.error(res.message);
            } else {
                toast.success(
                    editingSubject ? "Subject updated!" : "Subject created!",
                );
                setOpen(false);
                setSubjectName("");
                router.refresh();
            }
        } catch (err) {
            toast.error("Something went wrong!");
        } finally {
            setIsPending(false);
        }
    };

    //* delete subject
    const handleDelete = async (id: string) => {
        try {
            const res = await deleteSubject(id);
            if (!res.success) {
                return toast.error(res.message);
            }
            toast.success("Subject removed");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="space-y-8 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Subjects
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Total {initialData.length} categories available
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setEditingSubject(null);
                        setSubjectName("");
                        setOpen(true);
                    }}
                    className="w-full sm:w-auto"
                >
                    <Plus className="mr-2 h-4 w-4" /> New Subject
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {initialData.map((subject) => (
                    <Card
                        key={subject.id}
                        className="group relative overflow-hidden transition-all hover:shadow-md border-muted-foreground/10"
                    >
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        onClick={() => {
                                            setEditingSubject(subject);
                                            setSubjectName(subject.name);
                                            setOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4 text-blue-600" />
                                    </Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Delete Subject?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Remove{" "}
                                                    <span className="font-bold text-foreground capitalize">
                                                        {subject.name}
                                                    </span>{" "}
                                                    from the system.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        handleDelete(subject.id)
                                                    }
                                                    className="bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <CardTitle className="text-xl capitalize truncate">
                                {subject.name}
                            </CardTitle>
                            <div className="mt-2 flex items-center text-xs text-muted-foreground font-mono">
                                <Hash className="h-3 w-3 mr-1" />
                                {subject.id.slice(0, 8)}...
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-100">
                    <DialogHeader>
                        <DialogTitle>
                            {editingSubject
                                ? "Edit Subject"
                                : "Create New Subject"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Subject Name</Label>
                            <Input
                                id="name"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                placeholder="e.g. Mathematics"
                                className="capitalize"
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleSubmit()
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isPending}>
                            {isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {editingSubject ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
