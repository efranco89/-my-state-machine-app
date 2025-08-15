import { useState } from "react";

interface StateMachineConfig<StateType, StepNames extends string> {
  initialStep: StepNames;
  steps: {
    [key in StepNames]: {
      canAdvance: (state: StateType) => boolean;
    };
  };
  views: {
    [key in StepNames]: React.ComponentType<{
      state: StateType;
      setState: React.Dispatch<React.SetStateAction<StateType>>;
    }>;
  };
}

type WizardState = {
  name: string;
  age: number;
};

type StepNames = "step1" | "step2" | "confirm";

const stateMachineConfig: StateMachineConfig<WizardState, StepNames> = {
  initialStep: "step1",
  steps: {
    step1: {
      canAdvance: (state: WizardState) => !!state.name,
    },
    step2: {
      canAdvance: (state: WizardState) => !!state.age,
    },
    confirm: {
      canAdvance: () => true,
    },
  },
  views: {
    step1: ({ state, setState }) => (
      <div>
        <input
          type="text"
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter your name"
        />
      </div>
    ),
    step2: ({ state, setState }) => (
      <div>
        <input
          type="number"
          value={state.age}
          onChange={(e) =>
            setState((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
          placeholder="Enter your age"
        />
      </div>
    ),
    confirm: ({ state }) => (
      <div>
        <p>
          {state.name} is {state.age} years old
        </p>
      </div>
    ),
  },
};

const getStepView = <T, V extends string>(
  config: StateMachineConfig<T, V>,
  stepName: V
): React.ComponentType<{
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}> => config.views[stepName];

const StateMachineWizard = () => {
  const [wizardState, setWizardState] = useState<WizardState>({
    name: "",
    age: 0,
  });
  const [currentStep, setCurrentStep] = useState<StepNames>(
    stateMachineConfig.initialStep
  );

  const StepComponent = getStepView(stateMachineConfig, currentStep);

  const handleNext = () => {
    const canAdvance =
      stateMachineConfig.steps[currentStep].canAdvance(wizardState);
    if (canAdvance) {
      if (currentStep === "step1") setCurrentStep("step2");
      else if (currentStep === "step2") setCurrentStep("confirm");
    } else {
      alert("Please complete the current step before proceeding.");
    }
  };

  return (
    <section>
      <h1>State Machine Wizard ⭐</h1>
      <StepComponent state={wizardState} setState={setWizardState} />
      {currentStep !== "confirm" && <button onClick={handleNext}>Next</button>}
    </section>
  );
};


export default StateMachineWizard;