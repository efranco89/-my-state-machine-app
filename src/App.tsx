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

function App() {
  const [count, setCount] = useState(0);

  return <></>;
}

export default App;
