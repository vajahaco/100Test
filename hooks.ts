// useInform.ts
import { useState } from "react";

export const useInform = (initialState: boolean = false) => {
  const [value, setInform] = useState(initialState);

  const toggleInform = () => setInform((prev) => !prev);
  const openInform = () => setInform(true);
  const closeInform = () => setInform(false);

  // 컴포넌트에서 사용할 값들을 배열이나 객체로 반환
  return { value, toggleInform, openInform, closeInform };
};