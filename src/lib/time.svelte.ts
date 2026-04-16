let isClientMounted = $state(false);
let now = $state(new Date());
let isInitialized = false;

export function useClientTime() {
  $effect(() => {
    isClientMounted = true;

    if (!isInitialized) {
      isInitialized = true;
      now = new Date();

      const interval = setInterval(() => {
        now = new Date();
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  });

  return {
    get isMounted() {
      return isClientMounted;
    },
    get now() {
      return now;
    },
  };
}
