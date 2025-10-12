import { motion } from "framer-motion";
import { getFlowerStage } from "../../utils/streakUtils";

/**
 * FlowerGrowth component
 * Animated visual representation of user's streak progress
 * Shows different flower stages based on streak count
 */
const FlowerGrowth = ({ streak }) => {
  const stage = getFlowerStage(streak);

  const stageConfig = {
    seed: {
      emoji: "🌱",
      label: "Seed",
      color: "text-green-600",
      description: "Your journey begins!",
    },
    sprout: {
      emoji: "🌿",
      label: "Sprout",
      color: "text-green-500",
      description: "Growing strong!",
    },
    bud: {
      emoji: "🌸",
      label: "Bud",
      color: "text-pink-500",
      description: "Almost blooming!",
    },
    bloom: {
      emoji: "🌺",
      label: "Bloom",
      color: "text-pink-600",
      description: "Beautiful progress!",
    },
    garden: {
      emoji: "🌻",
      label: "Garden",
      color: "text-yellow-500",
      description: "Full bloom achieved!",
    },
  };

  const currentStage = stageConfig[stage];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        key={stage}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative"
      >
        {/* Main flower */}
        <motion.div
          className="text-8xl sm:text-9xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          role="img"
          aria-label={`${currentStage.label} stage flower`}
        >
          {currentStage.emoji}
        </motion.div>

        {/* Sparkles for advanced stages */}
        {(stage === "bloom" || stage === "garden") && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 text-2xl"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              ✨
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <h3 className={`text-2xl font-bold ${currentStage.color} mb-1`}>
          {currentStage.label}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {currentStage.description}
        </p>
      </motion.div>

      {/* Progress indicators */}
      <div className="mt-6 flex gap-2">
        {["seed", "sprout", "bud", "bloom", "garden"].map((s, index) => {
          const isCurrent = s === stage;
          const isPast =
            ["seed", "sprout", "bud", "bloom", "garden"].indexOf(s) <
            ["seed", "sprout", "bud", "bloom", "garden"].indexOf(stage);

          return (
            <motion.div
              key={s}
              className={`h-2 w-12 rounded-full ${
                isCurrent || isPast
                  ? "bg-primary-500"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FlowerGrowth;
