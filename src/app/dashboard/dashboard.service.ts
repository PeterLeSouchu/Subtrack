import api from '@/src/lib/axios.config';
import { useMutation } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';
import { MensualityType } from '@/src/types/mensuality';

interface MensualityResponse {
  data: {
    message: string;
    mensuality: MensualityType;
  };
}

export function usePostMensuality() {
  return useMutation<MensualityResponse, ErrorType, MensualityType>({
    mutationFn: (mensuality) => {
      return api.post('/mensuality', mensuality);
    },
  });
}
