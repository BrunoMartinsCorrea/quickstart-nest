import { useStore } from '@/stores/useStore';

export default function SignInPage() {
  useStore((state) => state);
  return (
    <div className="bg-white container rounded my-4 mx-auto shadow-lg p-4 flex gap-4">
      <div className=" bg-red-500 w-1/4 h-5 rounded"></div>
      <div className=" bg-green-500 w-full h-5 rounded"></div>
    </div>
  );
}
