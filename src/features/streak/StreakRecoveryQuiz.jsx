import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiRefreshCw } from "react-icons/fi";
import Button from "../../components/ui/Button";
import lsatQuestionsData from "../../data/lsatQuestions.json";

/**
 * StreakRecoveryQuiz component
 * Mini LSAT quiz to recover a broken streak
 * - 3 random easy questions
 * - Limited attempts (3 attempts total)
 * - Must get 2/3 correct to recover streak
 */
export function StreakRecoveryQuiz({ onSuccess, onClose, attemptsRemaining }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Load 3 random easy questions on mount
  useEffect(() => {
    const easyQuestions = lsatQuestionsData.questions.filter(
      (q) => q.difficulty === "easy"
    );

    // Shuffle and pick 3 random questions
    const shuffled = [...easyQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);

    setQuestions(selected);
  }, []);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      let correct = 0;
      questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctAnswer) {
          correct++;
        }
      });
      setScore(correct);
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    // Reload new random questions
    const easyQuestions = lsatQuestionsData.questions.filter(
      (q) => q.difficulty === "easy"
    );
    const shuffled = [...easyQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);

    setQuestions(selected);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showResults) {
    const passed = score >= 2;

    return (
      <div className="p-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            {passed ? (
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <FiCheckCircle className="w-12 h-12 text-green-600" />
              </div>
            ) : (
              <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <FiXCircle className="w-12 h-12 text-red-600" />
              </div>
            )}
          </motion.div>

          <h3 className="text-2xl font-bold text-foreground mb-2">
            {passed ? "Streak Recovered! 🎉" : "Not Quite There"}
          </h3>

          <p className="text-lg text-muted-foreground mb-6">
            You got {score} out of {questions.length} correct
          </p>

          {passed ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Great job! Your streak has been recovered. Keep up the excellent
                work!
              </p>
              <Button onClick={onSuccess} size="lg" className="w-full">
                Continue
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                You need at least 2 correct answers to recover your streak.
              </p>
              <p className="text-sm font-semibold text-foreground mb-6">
                Attempts remaining: {attemptsRemaining - 1}
              </p>

              {attemptsRemaining > 1 ? (
                <div className="space-y-3">
                  <Button
                    onClick={handleRetry}
                    size="lg"
                    className="w-full"
                    variant="primary"
                  >
                    <FiRefreshCw className="mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={onClose}
                    size="lg"
                    className="w-full"
                    variant="outline"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-destructive mb-6">
                    No attempts remaining. Your streak cannot be recovered.
                  </p>
                  <Button onClick={onClose} size="lg" className="w-full">
                    Close
                  </Button>
                </>
              )}
            </>
          )}

          {/* Show answers */}
          <div className="mt-8 text-left">
            <h4 className="font-semibold text-foreground mb-4">
              Review Answers:
            </h4>
            <div className="space-y-4">
              {questions.map((q, qIndex) => {
                const userAnswer = selectedAnswers[qIndex];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect
                        ? "bg-green-50 border-green-300"
                        : "bg-red-50 border-red-300"
                    }`}
                  >
                    <p className="font-medium text-sm text-foreground mb-2">
                      Q{qIndex + 1}: {q.question}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      Your answer: {q.options[userAnswer]}
                    </p>
                    {!isCorrect && (
                      <p className="text-xs text-green-700 font-medium">
                        Correct answer: {q.options[q.correctAnswer]}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <div className="p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-xs text-muted-foreground">
            {question.section}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-background"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedAnswer === index
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}
                  >
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-foreground">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Attempts remaining: {attemptsRemaining}
            </span>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default StreakRecoveryQuiz;
