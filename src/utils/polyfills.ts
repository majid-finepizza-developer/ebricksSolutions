/**
 * Modern Web Guidance feature detection & conditional polyfill loader.
 * Zero polyfill bundles are downloaded on browsers with native support.
 */

let initialized = false;
let supportsDisplayTransition: boolean | undefined;

export function initModernPlatformPolyfills(): void {
  if (initialized || typeof window === 'undefined' || typeof HTMLElement === 'undefined') {
    return;
  }
  initialized = true;

  // 1. Popover API polyfill — feature detected on HTMLElement.prototype
  if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
    void import('@oddbird/popover-polyfill');
  }

  // 2. Invoker Commands polyfill — feature detected on HTMLButtonElement.prototype
  if (typeof HTMLButtonElement !== 'undefined' && !('commandForElement' in HTMLButtonElement.prototype)) {
    void import('invokers-polyfill');
  }
}

/**
 * Probes whether discrete `display` transitions actually hold `display: block`
 * before switching to `none` (works around Firefox parsing `allow-discrete`
 * without transitioning `display`).
 */
export function canTransitionDisplay(): boolean {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (
    typeof window === 'undefined' ||
    !window.CSS?.supports?.('transition-behavior', 'allow-discrete') ||
    !document.body
  ) {
    return false;
  }

  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  void getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
}

export function supportsTopLayerExit(): boolean {
  return (
    typeof window !== 'undefined' &&
    Boolean(window.CSS?.supports?.('overlay', 'auto')) &&
    canTransitionDisplay()
  );
}

/**
 * Animates a modal `<dialog>` closed smoothly in browsers lacking full
 * discrete `display` + `overlay` top-layer exit transitions.
 */
export async function closeModalDialog(dialog: HTMLDialogElement): Promise<void> {
  if (!dialog.open) return;

  if (!supportsTopLayerExit()) {
    dialog.setAttribute('data-closing', '');
    const animations = dialog.getAnimations?.({ subtree: true }) ?? [];
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((resolve) => window.setTimeout(resolve, 450)),
      ]);
    }
    if (!dialog.hasAttribute('data-closing')) return;
    dialog.removeAttribute('data-closing');
  }

  dialog.close();
}

/**
 * Attaches light-dismiss fallback (`closedby="any"`) when `HTMLDialogElement.prototype.closedBy`
 * is missing, plus routes `cancel` requests through animated top-layer close.
 */
export function attachDialogEnhancements(dialog: HTMLDialogElement): () => void {
  const cleanups: Array<() => void> = [];

  const handleCancel = (event: Event) => {
    event.preventDefault();
    void closeModalDialog(dialog);
  };
  dialog.addEventListener('cancel', handleCancel);
  cleanups.push(() => dialog.removeEventListener('cancel', handleCancel));

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const isOutsideDialog = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutsideDialog(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutsideDialog(e)) {
        void closeModalDialog(dialog);
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    cleanups.push(() => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    });
  }

  return () => {
    for (const fn of cleanups) fn();
  };
}

export function openModalFallback(dialogId: string): void {
  const hasNativeCommandFor =
    typeof HTMLButtonElement !== 'undefined' && 'commandForElement' in HTMLButtonElement.prototype;
  if (hasNativeCommandFor) return;

  queueMicrotask(() => {
    const dialog = document.getElementById(dialogId);
    if (dialog instanceof HTMLDialogElement && !dialog.open) {
      dialog.showModal();
    }
  });
}
