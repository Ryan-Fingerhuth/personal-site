import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';

export default function CopyButton({
  copyText,
  className,
}: {
  copyText: string;
  className: string;
}) {
  function handleClick() {
    navigator.clipboard.writeText(copyText);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Copied!">
        <button className={className} onClick={handleClick}>
          Copy
        </button>
      </Tooltip>
    </ClickAwayListener>
  );
}
