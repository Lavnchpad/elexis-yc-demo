import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import AiGeneratedQuestions from './AiGeneratedQuestions';
import { toast } from 'sonner';

function generateUniqueId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

export default function QuestionnaireEditor({
    questions = [],
    jobView = false,
    interviewId,
    setQuestions,
    // onSaveQuestions,
    onAddQuestion,
    getJdAndRole,
    onRemoveQuestion,
    viewOnly = false, // Added viewOnly prop to control editability
}) {
    const [newQuestionText, setNewQuestionText] = useState('');
    const [aigeneratedQuestions, setAiGeneratedQuestion] = useState([])
    const newQuestionInputRef = useRef(null);

    const handleAddAiQuestion = (id) => {
        const questionToAdd = aigeneratedQuestions.find(q => q.id === id);
        if (questionToAdd) {
            const newQuestion = { id: generateUniqueId(), question: questionToAdd.question.trim() };
            // setting the AI generated question to the original selected question array state
            setQuestions((prev) => {
                return [...prev, newQuestion];
            });
            toast.success(`Question "${questionToAdd.question}" added successfully!`);
            setAiGeneratedQuestion((prev) => prev.filter(q => q.id !== id));
        }
    }
    const handleInternalAddQuestion = () => {
        if (newQuestionText.trim()) {
            const newQuestion = { id: generateUniqueId(questions[questions.length - 1].id + 1), question: newQuestionText.trim() };
            setQuestions((prev) => {
                return [...prev, newQuestion];
            });
            setNewQuestionText('');
            if (newQuestionInputRef.current) {
                newQuestionInputRef.current.focus();
            }
            if (onAddQuestion) {
                onAddQuestion(newQuestion);
            }
        }
    };


    const handleInternalRemoveQuestion = (idToRemove) => {
        setQuestions((prevQuestions) => prevQuestions.filter(q => q.id !== idToRemove));
        if (onRemoveQuestion) {
            onRemoveQuestion(idToRemove);
        }
    };

    return (
        <div className="">
            <div className="py-6 space-y-6">
                <div className="flex flex-col gap-3 rounded-lg ">
                    {/* <Label htmlFor="new-question-input" className="text-md font-semibold text-lg">
                        Add New Question
                    </Label> */}
                    <div className="flex gap-2">
                        <Input
                            id="new-question-input"
                            ref={newQuestionInputRef}
                            placeholder="Type your question here..."
                            value={newQuestionText}
                            onChange={(e) => setNewQuestionText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleInternalAddQuestion();
                                }
                            }}
                            className="flex-1 text-base py-2"
                        />
                        <Button
                            onClick={handleInternalAddQuestion}
                            disabled={!newQuestionText.trim() || viewOnly}

                        >
                            <PlusCircle className="w-5 h-5" />
                            {/* <span>Add</span> */}
                        </Button>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Selected Questions ({questions.length})</h3>
                {questions.length === 0 && (
                    <p className="text-gray-500 text-center italic py-4">No questions added yet. Start by adding one!</p>
                )}
                    <ScrollArea className="h-40 max-h-[50vh] pr-4">
                        <div className="space-y-3">
                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className="flex items-center justify-between p-3 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <span className="text-gray-800 text-base flex-1 mr-4">
                                        {index + 1}. {question.question}
                                    </span>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleInternalRemoveQuestion(question.id)}
                                        className="rounded-full w-8 h-8 flex-shrink-0"
                                        title="Remove Question"
                                        disabled={viewOnly}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                            {/*  Add AI Generated Questions Section */}
                            <div className="space-y-3 text-xs shadow-sm mt-4">
                                {aigeneratedQuestions.map((question, index) => (
                                    <div
                                        key={question.id}
                                        className="flex items-center justify-between p-3 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <span className="text-gray-800 flex-1 mr-4">
                                            * {question.question}
                                        </span>
                                        <Button
                                            size="icon"
                                            onClick={() => handleAddAiQuestion(question.id)}
                                            className="rounded-full w-8 h-8 flex-shrink-0"
                                            title="Add Question"
                                            disabled={viewOnly}
                                        >
                                            <PlusCircle className="w-4 h-4" />
                                            <span className="sr-only">Add</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                    <AiGeneratedQuestions aigeneratedQuestions={aigeneratedQuestions} setAiGeneratedQuestion={setAiGeneratedQuestion} getJdAndRole={getJdAndRole} viewOnly={viewOnly} interviewId={interviewId} jobView={!!jobView} />
                    </ScrollArea>

            </div>

            {/* <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <Button
                    type="submit"
                    onClick={handleInternalSaveChanges}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition-colors"
                >
                    Save Changes
                </Button>
            </div> */}
        </div>
    );
}
