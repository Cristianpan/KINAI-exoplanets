import { useState, useCallback } from 'react';
import { apiService, PredictionRequest, PredictionResponse } from '../services/api';

export interface PredictionState {
  isLoading: boolean;
  error: string | null;
  result: PredictionResponse | null;
  isComplete: boolean;
}

export interface UsePredictionReturn {
  predictionState: PredictionState;
  makePrediction: (data: PredictionRequest, modelType: 'simple' | 'complex') => Promise<void>;
  resetPrediction: () => void;
}

export const usePrediction = (): UsePredictionReturn => {
  const [predictionState, setPredictionState] = useState<PredictionState>({
    isLoading: false,
    error: null,
    result: null,
    isComplete: false,
  });

  const makePrediction = useCallback(async (
    data: PredictionRequest,
    modelType: 'simple' | 'complex'
  ) => {

    console.log("data", data); 
    setPredictionState({
      isLoading: true,
      error: null,
      result: null,
      isComplete: false,
    });

    try {
      let response: PredictionResponse;
      
      if (modelType === 'complex') {
        response = await apiService.deepPredict(data);
      } else {
        response = await apiService.fastPredict(data);
      }

      setPredictionState({
        isLoading: false,
        error: null,
        result: response,
        isComplete: true,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setPredictionState({
        isLoading: false,
        error: errorMessage,
        result: null,
        isComplete: false,
      });
    }
  }, []);

  const resetPrediction = useCallback(() => {
    setPredictionState({
      isLoading: false,
      error: null,
      result: null,
      isComplete: false,
    });
  }, []);

  return {
    predictionState,
    makePrediction,
    resetPrediction,
  };
};