export type Form = {
  _type: "form";
  title?: string;
  heading?: string;
  text?: string;
  items?: Array<{
    type?: "email" | "message" | "phone" | "text";
    title?: string;
    placeholder?: string;
    _type: "formItems";
    _key: string;
  }>;
};

type FormProps = {
  block: Form;
  index: number;
};

export default function Form({ block }: FormProps) {
  if (!block) return null;

  return (
    <div className="container px-4 py-6 md:px-8 md:py-10">
      {block.heading && (
        <div className="text-xl md:text-2xl">{block.heading}</div>
      )}

      {block.text && (
        <div className="mt-2 text-sm md:mt-4 md:text-base">{block.text}</div>
      )}

      {block.items && block.items.length > 0 && (
        <div className="mt-4 space-y-4 md:mt-6 md:space-y-6">
          {block.items.map((item) => {
            return (
              <div key={item._key} className="flex flex-col gap-2">
                {item.title && (
                  <div className="text-sm font-medium md:text-base">
                    {item.title}
                  </div>
                )}

                {item.placeholder && (
                  <input
                    type={item.type || "text"}
                    placeholder={item.placeholder}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm md:text-base"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
