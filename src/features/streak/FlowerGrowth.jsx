import { motion, AnimatePresence } from "framer-motion";
import {
  getFlowerStage,
  getCollectedFlowers,
  getNextFlower,
} from "../../utils/streakUtils";
import { useState } from "react";

/**
 * FlowerGrowth component
 * Animated visual representation of user's streak progress
 * Shows different flower stages based on streak count
 * Includes garden collection - unlock new flowers every 7 days!
 */
const FlowerGrowth = ({ streak }) => {
  const [showGarden, setShowGarden] = useState(true);
  const stage = getFlowerStage(101);
  const collectedFlowers = getCollectedFlowers(101);
  const nextFlower = getNextFlower(101);

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
                  ? "bg-green-500"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          );
        })}
      </div>

      {/* Garden Collection Button */}
      {collectedFlowers.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowGarden(!showGarden)}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          {showGarden ? "Hide" : "View"} My Garden 🌺 ({collectedFlowers.length}
          )
        </motion.button>
      )}

      {/* Next Flower Preview */}
      {nextFlower && !showGarden && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 p-3 bg-accent rounded-lg border border-border"
        >
          <p className="text-xs text-muted-foreground mb-1">Next unlock:</p>
          <p className="text-sm font-semibold text-foreground">
            {nextFlower.emoji} {nextFlower.name} in {nextFlower.daysRemaining}{" "}
            day{nextFlower.daysRemaining !== 1 ? "s" : ""}
          </p>
        </motion.div>
      )}

      {/* Garden Collection Display */}
      <AnimatePresence>
        {showGarden && collectedFlowers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 w-full max-w-2xl"
          >
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-xl p-6 border-2 border-green-300 dark:border-green-700">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                🌺 My Flower Garden 🌺
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-6">
                You've unlocked {collectedFlowers.length} flower
                {collectedFlowers.length !== 1 ? "s" : ""}!
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {collectedFlowers.map((flower, index) => (
                  <motion.div
                    key={flower.name}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <motion.div
                      className="text-4xl mb-2"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {flower.emoji}
                    </motion.div>
                    <p
                      className={`text-xs font-semibold ${flower.color} text-center`}
                    >
                      {flower.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Day {flower.unlockDay}
                    </p>
                    {flower.description && (
                      <p className="text-xs text-muted-foreground italic mt-1 text-center">
                        {flower.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress to next flower */}
              {nextFlower && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-green-400 dark:border-green-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">
                      Next: {nextFlower.emoji} {nextFlower.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {nextFlower.daysRemaining} day
                      {nextFlower.daysRemaining !== 1 ? "s" : ""} to go
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((streak % 7) / 7) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              {collectedFlowers.length >= 15 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg text-center border-2 border-yellow-400"
                >
                  <p className="text-2xl mb-2">🏆</p>
                  <p className="font-bold text-foreground">Master Gardener!</p>
                  <p className="text-sm text-muted-foreground">
                    You've collected all flowers!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlowerGrowth;
