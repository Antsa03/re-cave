import { useCallback, useState } from "react";

/**
 * Hook personnalisé pour gérer le rafraîchissement des données
 * avec pull-to-refresh
 */
export function useRefresh(refreshFunction: () => Promise<void>) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshFunction();
    } catch (error) {
      console.error("Erreur lors du rafraîchissement:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshFunction]);

  return { refreshing, onRefresh };
}
