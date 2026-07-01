"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Nullable } from "@/types/common";

import { ConfirmDialog } from "./confirm-dialog";
import { ONBOARDING_STEPS, OnboardingState } from "./state";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingState>(
    ONBOARDING_STEPS.FIRST
  );
  const [isFinished, setIsFinished] = useState(false);
  const [confirmModalContext, setConfirmModalContext] = useState<
    Nullable<{
      message: string;
      onConfirm: () => void;
    }>
  >(null);

  const onboardingContext = {
    onChangeStep: setCurrentStep,
    onCancel: () => {
      toast("Onboarding process has been canceled.");
      setCurrentStep(ONBOARDING_STEPS.FIRST);
    },
    onFinish: () => {
      toast("Onboarding process completed successfully!");
      setIsFinished(true);
    },
    openConfirmModal: (message: string, onConfirm: () => void) => {
      setConfirmModalContext({
        message,
        onConfirm: () => {
          onConfirm();
          setConfirmModalContext(null);
        },
      });
    },
  };

  const handlePrev = () => currentStep.onPrev?.(onboardingContext);
  const handleNext = () => currentStep.onNext(onboardingContext);
  const handleCancel = () => currentStep.onCancel(onboardingContext);
  const handleRestart = () => {
    setIsFinished(false);
    setCurrentStep(ONBOARDING_STEPS.FIRST);
  };

  return (
    <>
      {confirmModalContext && (
        <ConfirmDialog
          title="Cancel Onboarding"
          description={confirmModalContext.message}
          onConfirm={confirmModalContext.onConfirm}
          onCancel={() => setConfirmModalContext(null)}
        />
      )}
      <div className="h-full center">
        <div className="flex flex-col p-4 gap-4 border rounded">
          {isFinished ? (
            <>
              <h2 className="text-xl font-semibold">Onboarding Complete</h2>
              <p>Thank you for completing the onboarding process!</p>
              <Button onClick={handleRestart}>Restart</Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">
                {currentStep.render().title}
              </h2>
              <p>{currentStep.render().description}</p>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={!currentStep.onPrev}
                >
                  Previous
                </Button>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleNext}>Next</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
