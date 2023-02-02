import { useState } from 'react';

export default function CounterButton({
  buttonClassName,
}: {
  buttonClassName: string;
}) {
  const [currentCount, setCurrentCount] = useState(0);

  function handleClick() {
    setCurrentCount(currentCount + 1);
  }

  return (
    <div>
      <div>{currentCount > 170 ? 'yo you can stop now' : currentCount}</div>
      <button className={buttonClassName} onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
}
