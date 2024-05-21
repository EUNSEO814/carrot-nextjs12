import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter");
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
}

// router.push() vs router.replace()

// 이전 페이지에 대한 히스토리를 남기고 싶다면 router.push()를, 남기고 싶지 않다면 router.replace()를 사용할 수 있습니다.
// (router.replace는 히스토리 스택에 새 URL 항목을 추가하는 것을 방지합니다.)
