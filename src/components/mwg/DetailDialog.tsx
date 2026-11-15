import React, { useEffect, useRef } from 'react';
import { IconRenderer } from '../IconRenderer';
import {
  attachDialogEnhancements,
  closeModalDialog,
  supportsTopLayerExit,
} from '../../utils/polyfills';

export interface DetailDialogAction {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface DetailDialogProps {
  dialogId: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: string;
  accentIcon?: boolean;
  closeLabel: string;
  closeButtonLabel: string;
  primaryAction?: DetailDialogAction;
  children: React.ReactNode;
}

export const DetailDialog: React.FC<DetailDialogProps> = ({
  dialogId,
  title,
  subtitle,
  badge,
  icon,
  accentIcon = false,
  closeLabel,
  closeButtonLabel,
  primaryAction,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `${dialogId}-title`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const detach = attachDialogEnhancements(dialog);
    const handleClose = () => {
      dialog.returnValue = '';
    };
    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
      detach();
    };
  }, []);

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const hasNativeCommandFor =
      typeof HTMLButtonElement !== 'undefined' && 'commandForElement' in HTMLButtonElement.prototype;

    if (!supportsTopLayerExit() || !hasNativeCommandFor) {
      event.preventDefault();
      void closeModalDialog(dialog);
    }
  };

  const handlePrimaryActionClick = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      void closeModalDialog(dialog);
    }
    primaryAction?.onClick?.();
  };

  return (
    <dialog
      ref={dialogRef}
      id={dialogId}
      closedby="any"
      aria-labelledby={titleId}
      className="mwg-dialog mwg-dialog--detail"
    >
      <div className="mwg-dialog-header">
        <div className="mwg-dialog-header-main">
          {icon ? (
            <span className={accentIcon ? 'icon-tile icon-tile--accent' : 'icon-tile'}>
              <IconRenderer name={icon} size={22} aria-hidden="true" />
            </span>
          ) : null}

          <div className="mwg-dialog-heading-group">
            {badge ? <span className="meta-chip mwg-dialog-kicker">{badge}</span> : null}
            <h2 id={titleId} className="mwg-dialog-title">
              {title}
            </h2>
            {subtitle ? <p className="mwg-dialog-subtitle">{subtitle}</p> : null}
          </div>
        </div>

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

      <div className="mwg-dialog-detail-body">{children}</div>

      <div className="mwg-dialog-footer mwg-dialog-footer-actions">
        <button
          type="button"
          command="close"
          commandfor={dialogId}
          onClick={handleCloseClick}
          className="btn btn-secondary"
        >
          {closeButtonLabel}
        </button>

        {primaryAction ? (
          <a
            href={primaryAction.href}
            onClick={handlePrimaryActionClick}
            className="btn btn-primary"
          >
            <span>{primaryAction.label}</span>
            <IconRenderer name="ArrowRight" size={16} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </dialog>
  );
};

export default DetailDialog;
