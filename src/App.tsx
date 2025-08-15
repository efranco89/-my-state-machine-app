import { useState } from 'react'

interface StateMachineConfig<StateType, StepNames extends string> {
  initialStep: StepNames;
  steps: {
    [key in StepNames] : {
      canAdvance: (state: StateType) => boolean;

    }
  };
  views: {
    [key in StepNames]: React.ComponentType <{
      state: StateType;
      setState: React.Dispatch<React.SetStateAction<StateType>>;
    }>
  }
}

type WizardState = {
  name: string;
  age: number;
}

type StepNames = "step1" | "step2" | "confirm";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    </>
  )
}

export default App
