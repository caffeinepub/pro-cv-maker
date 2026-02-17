import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CVData } from '../backend';

export function useGetCV() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<CVData | null>({
    queryKey: ['cv'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCV();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveCV() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cvData: CVData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCV(cvData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cv'] });
    },
  });
}

export function useClearCV() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.clearCV();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cv'] });
    },
  });
}
