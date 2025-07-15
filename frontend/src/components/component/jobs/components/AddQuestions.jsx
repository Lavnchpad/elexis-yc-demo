import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Move, PlusCircle, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import AiGeneratedQuestions from './AiGeneratedQuestions';
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

function generateUniqueId() {
    return uuidv4();
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
    const scrollAreaRef = useRef(null);

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
            const tempId = (questions[questions.length - 1]?.id || 0)
            const newQuestion = { id: generateUniqueId(tempId + 1), question: newQuestionText.trim() };
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

    const onDragEnd = (result) => {
        // Dropped outside the list
        if (!result.destination) {
            return;
        }
        const reorderedQuestions = reorder(
            questions,
            result.source.index,
            result.destination.index
        );
        setQuestions(reorderedQuestions);
    };

    return (
        <div className="">
            <div className="py-4 space-y-6" ref={scrollAreaRef}>
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
                <ScrollArea className="h-56 pr-4">
                    <div className="space-y-3">
                        <DragDropContext onDragEnd={onDragEnd} getContainerForClone={scrollAreaRef.current}>
                            <Droppable droppableId="questions-list">
                                {(provided) => (
                                    <div
                                        className="space-y-3"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {questions.map((question, index) => (
                                            <Draggable
                                                key={question.id}
                                                draggableId={question.id} // Must be a string
                                                index={index}
                                                isDragDisabled={viewOnly} // Disable drag if viewOnly
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps} // This makes the entire item draggable
                                                        className={`flex items-center justify-between p-3 border border-gray-200 bg-white rounded-lg shadow-sm transition-shadow 
                                                        ${snapshot.isDragging ? 'shadow-lg bg-blue-50' : 'hover:shadow-md'} 
                                                        ${viewOnly ? 'cursor-not-allowed' : 'cursor-grab'}`}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                        }}
                                                    >
                                                        <Move className='mr-2' />
                                                        <span className="text-gray-800 text-sm flex-1 mr-4">
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
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder} {/* Essential for correct drag behavior */}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        {/* {questions.map((question, index) => (
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
                            ))} */}

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

        </div>
    );
}


function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
