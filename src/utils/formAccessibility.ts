/**
 * Synchronizes native `:user-invalid` validation visuals with ARIA state (`aria-invalid`,
 * conditional `aria-describedby` linking via `data-error`, and a single polite live region),
 * plus WeakMap fallbacks for pre-`:user-invalid` / pre-`:has()` browsers.
 */

export function attachAccessibleFormValidation(form: HTMLFormElement): () => void {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.className = 'visually-hidden';
  document.body.append(announcer);

  let announceTimer: number | undefined;
  let announcedField: Element | null = null;

  const flagged = new WeakSet<Element>();
  const announced = new WeakSet<Element>();
  const dirtyState = new WeakMap<Element, { hasInteracted: boolean; hasBlurred: boolean }>();

  const supportsUserInvalid =
    typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:user-invalid)');
  const supportsHas =
    typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:has(a))');

  const linkError = (el: HTMLElement, shown: boolean) => {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
    else el.removeAttribute('aria-describedby');
  };

  const spokenText = (node: Element): string => {
    const copy = node.cloneNode(true) as Element;
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
      n.replaceWith(`${n.getAttribute('aria-label')}: `);
    });
    return (copy.textContent || '').replace(/\s+/g, ' ').trim();
  };

  const announceError = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const error = document.getElementById(errorId);
    if (!error) return;
    const labelEl = 'labels' in el && el.labels?.[0] ? el.labels[0] : null;
    const label = labelEl ? `${spokenText(labelEl)}: ` : '';

    window.clearTimeout(announceTimer);
    announcer.textContent = '';
    announcedField = el;

    announceTimer = window.setTimeout(() => {
      announcer.textContent = label + spokenText(error);
    }, 500);
  };

  const syncParentErrorFallback = (control: Element) => {
    if (supportsHas) return;
    const fieldGroup = control.closest('.mwg-field');
    if (!fieldGroup) return;
    const hasError = Boolean(
      fieldGroup.querySelector(':is(:user-invalid, .user-invalid-fallback)'),
    );
    fieldGroup.classList.toggle('has-error-fallback', hasError);
  };

  const syncAria = (el: EventTarget | null, announce = false) => {
    if (
      !(
        el instanceof HTMLInputElement ||
        el instanceof HTMLSelectElement ||
        el instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }

    const isInvalid = supportsUserInvalid
      ? el.matches(':user-invalid')
      : el.classList.contains('user-invalid-fallback');

    if (isInvalid) {
      if (announce && !announced.has(el)) {
        announceError(el);
        announced.add(el);
      }
      el.setAttribute('aria-invalid', 'true');
      linkError(el, true);
      flagged.add(el);
    } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
      el.setAttribute('aria-invalid', 'false');
      linkError(el, false);
      flagged.delete(el);
      announced.delete(el);
      if (announcedField === el) {
        window.clearTimeout(announceTimer);
        announcer.textContent = '';
      }
    }

    syncParentErrorFallback(el);
  };

  const updateFallbackClasses = (
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  ) => {
    if (supportsUserInvalid) return;
    const isValid = input.validity.valid;
    input.classList.toggle('user-invalid-fallback', !isValid);
    input.classList.toggle('user-valid-fallback', isValid);
  };

  const controls = () =>
    Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input, select, textarea',
      ),
    );

  // Start every field explicitly at aria-invalid="false"
  controls().forEach((el) => {
    el.setAttribute('aria-invalid', 'false');
    linkError(el, false);
  });

  const onBlur = (e: FocusEvent) => {
    const target = e.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }
    if (!supportsUserInvalid) {
      const state = dirtyState.get(target) || { hasInteracted: false, hasBlurred: false };
      state.hasBlurred = true;
      dirtyState.set(target, state);
      if (state.hasInteracted) {
        updateFallbackClasses(target);
      }
    }
    syncAria(target, true);
  };

  const onInput = (e: Event) => {
    const target = e.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }
    if (!supportsUserInvalid) {
      const state = dirtyState.get(target) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      dirtyState.set(target, state);
      if (state.hasBlurred) {
        updateFallbackClasses(target);
      }
    }
    if (target.hasAttribute('aria-invalid')) {
      syncAria(target, false);
    }
  };

  const onChange = (e: Event) => {
    const target = e.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }
    if (!supportsUserInvalid) {
      const state = dirtyState.get(target) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      dirtyState.set(target, state);
      if (state.hasBlurred || target instanceof HTMLSelectElement) {
        updateFallbackClasses(target);
      }
    }
    syncAria(target, true);
  };

  const onInvalid = (e: Event) => {
    const target = e.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }
    if (!supportsUserInvalid) {
      dirtyState.set(target, { hasInteracted: true, hasBlurred: true });
      updateFallbackClasses(target);
    }
    announced.add(target);
    syncAria(target, false);
  };

  const onReset = () => {
    window.setTimeout(() => {
      controls().forEach((el) => {
        dirtyState.delete(el);
        el.classList.remove('user-invalid-fallback', 'user-valid-fallback');
        syncAria(el, false);
      });
    }, 0);
  };

  form.addEventListener('blur', onBlur, true);
  form.addEventListener('input', onInput);
  form.addEventListener('change', onChange, true);
  form.addEventListener('invalid', onInvalid, true);
  form.addEventListener('reset', onReset, true);

  return () => {
    window.clearTimeout(announceTimer);
    form.removeEventListener('blur', onBlur, true);
    form.removeEventListener('input', onInput);
    form.removeEventListener('change', onChange, true);
    form.removeEventListener('invalid', onInvalid, true);
    form.removeEventListener('reset', onReset, true);
    announcer.remove();
  };
}
