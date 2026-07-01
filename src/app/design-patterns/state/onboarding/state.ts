interface OnboardingContext {
  onChangeStep: (step: OnboardingState) => void;
  onCancel: () => void;
  onFinish: () => void;
  openConfirmModal: (message: string, onConfirm: () => void) => void;
}

export interface OnboardingState {
  onPrev?: (context: OnboardingContext) => void;
  onNext: (context: OnboardingContext) => void;
  onCancel: (context: OnboardingContext) => void;
  render: () => {
    title: string;
    description: string;
  };
}

abstract class BaseOnboardingState implements OnboardingState {
  abstract onNext(context: OnboardingContext): void;
  abstract onCancel(context: OnboardingContext): void;
  abstract render(): { title: string; description: string };

  protected constructor() {}

  private static instances = new Map<
    new () => BaseOnboardingState,
    BaseOnboardingState
  >();

  public static getInstance<T extends BaseOnboardingState>(
    this: new () => T
  ): T {
    if (!BaseOnboardingState.instances.has(this)) {
      BaseOnboardingState.instances.set(this, new this());
    }
    return BaseOnboardingState.instances.get(this) as T;
  }
}

class FirstStep extends BaseOnboardingState {
  constructor() {
    super();
  }

  onNext(context: OnboardingContext) {
    context.onChangeStep(SecondStep.getInstance());
  }

  onCancel(context: OnboardingContext) {
    context.openConfirmModal(
      "This is the first step. Are you sure you want to cancel the onboarding process?",
      context.onCancel
    );
  }

  render() {
    return {
      title: "Welcome to the Onboarding Process",
      description: "This is the first step of the onboarding process.",
    };
  }
}

class SecondStep extends BaseOnboardingState {
  constructor() {
    super();
  }

  onPrev(context: OnboardingContext) {
    context.onChangeStep(FirstStep.getInstance());
  }

  onNext(context: OnboardingContext) {
    context.onChangeStep(ThirdStep.getInstance());
  }

  onCancel(context: OnboardingContext) {
    context.openConfirmModal(
      "This is the second step. Are you sure you want to cancel the onboarding process?",
      context.onCancel
    );
  }

  render() {
    return {
      title: "Second Step",
      description: "This is the second step of the onboarding process.",
    };
  }
}

class ThirdStep extends BaseOnboardingState {
  constructor() {
    super();
  }

  onPrev(context: OnboardingContext) {
    context.onChangeStep(SecondStep.getInstance());
  }

  onNext(context: OnboardingContext) {
    context.onFinish();
  }

  onCancel(context: OnboardingContext) {
    context.openConfirmModal(
      "Are you sure you want to cancel the onboarding process?",
      context.onCancel
    );
  }

  render() {
    return {
      title: "Final Step",
      description: "This is the final step of the onboarding process.",
    };
  }
}

export const ONBOARDING_STEPS = {
  get FIRST() {
    return FirstStep.getInstance();
  },
  get SECOND() {
    return SecondStep.getInstance();
  },
  get THIRD() {
    return ThirdStep.getInstance();
  },
};
