import { motion } from "motion/react"

export default function SectionHeader ({ activeStep, currentStep, title }) {
    return (
      <div className="mb-6 pt-6 px-2 md:px-0">
        <div className="flex items-center flex-row mb-1 gap-32  md:gap-80 ">
          
          {/* Section Title */}
          <h3 className="text-gray-100 md:text-3xl text-2xl font-semibold flex flex-row font-header">
            {title} 
          </h3>
          <p className="text-gray-400 md:text-3xl text-2xl font-header">Step {currentStep}/3</p>
        </div>
  
        {/* Progress Bar */}
        <motion.div 
          className="h-1 bg-line rounded-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-1 bg-button rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: activeStep >= currentStep 
                ? '100%' 
                : activeStep === currentStep - 1
                  ? '33%'
                  : '0%'
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    );
  };