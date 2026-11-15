import React, { useEffect, useRef } from 'react';
import { IconRenderer } from '../IconRenderer';
import {
  attachDialogEnhancements,
  closeModalDialog,
  supportsTopLayerExit,
} from '../../utils/polyfills';

export interface ScreenshotDialogProps {
  dialogId: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  caption?: string;
  closeLabel: string;
}

export const ScreenshotDialog: React.FC<ScreenshotDialogProps> = ({
  dialogId,
  title,
  imageSrc,
  imageAlt,
  width,
  height,
  caption,
  closeLabel,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `${dialogId}-title`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    return attachDialogEnhancements(dialog);
  }, []);

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const hasNativeCommandFor =
      typeof HTMLButtonElement !== 'undefined' && 'commandForElement' in HTMLButtonElement.prototype;

    // Preserve animated exit when discrete top-layer transition isn't fully supported or when native commandfor is absent.
    if (!supportsTopLayerExit() || !hasNativeCommandFor) {
      event.preventDefault();
      void closeModalDialog(dialog);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id={dialogId}
      closedby="any"
      aria-labelledby={titleId}
      className="mwg-dialog"
    >
      <div className="mwg-dialog-header">
        <p id={titleId} className="mwg-dialog-title">
          {title}
        </p>
        <button
          type="button"
          command="close"
          commandfor={dialogId}
          aria-label={closeLabel}
          autoFocus
          onClick={handleCloseClick}
          className="mwg-dialog-close"
        >
          <IconRenderer name="X" size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="mwg-dialog-body">
        <img
          src={imageSrc}
          alt={imageAlt}
          width={width}
          height={height}
          decoding="async"
        />
      </div>

      {caption ? <div className="mwg-dialog-footer">{caption}</div> : null}
    </dialog>
  );
};
