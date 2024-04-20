import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setSate((prev) => ({ ...prev, data })))
      .catch((error) => setSate((prev) => ({ ...prev, error })))
      .finally(() => setSate((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}

// interface UseMutationState {
//   loading: boolean;
//   data?: object;
//   error?: object;
// }
// interface IUseState {
//   loading: boolean;
//   data: undefined | any;
//   error: undefined | any;
// }
// type UseMutationResult = [(data: any) => void, UseMutationState];

// export default function useMutation(url: string): UseMutationResult {
//   const [state, setState] = useState<IUseState>({
//     loading: false,
//     data: undefined,
//     error: undefined,
//   });
//   const { loading, data, error } = state;
//   function mutation(data: any) {
//     setState({
//       ...state,
//       loading: true,
//     });
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json().catch(() => {}))
//       .then((json) =>
//         setState({
//           ...state,
//           data: json,
//         })
//       )
//       .catch((error) => setState({ ...state, error }))
//       .finally(() => setState({ ...state, loading: false }));
//   }
//   return [mutation, { loading, data, error }];
// }
// interface UseMutationState {
//   loading: boolean;
//   data?: object;
//   error?: object;
// }

// type UseMutationResult = [(data: any) => void, UseMutationState];

// export default function useMutation(url: string): UseMutationResult {
//   // const [state, setState] =useState({
//   //     loading: false,
//   //     data:undefined,
//   //     error:undefined
//   // })
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<undefined | any>(undefined);
//   const [error, setError] = useState<undefined | any>(undefined);
//   function mutation(data?: any) {
//     setLoading(true);
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json().catch(() => {}))
//       //   .then((json) => setData(json));
//       // ===
//       .then(setData)
//       .catch(setError)
//       .finally(() => setLoading(false));
//   }
//   return [mutation, { loading, data, error }];
// }
