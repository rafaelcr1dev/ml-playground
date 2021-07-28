export default function Presentation({ children }:any) {
  return (
    <section className={"bg-white flex h-full justify-center items-center flex-col shadow rounded px-4"}>
      {children}
    </section>
  );
}
