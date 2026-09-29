import Image from "next/image";
import CategoryHero from "../CategoryHeto";
import { BlogPost } from "@/content/blogPost";

function Typescript({ post }: { post: BlogPost }) {
  const typesOptions = [
    {
      id: 1,
      title: "Primitive Types",
      image: "/blogs/primitive_types.png",
      summary:
        "Basic building blocks of TypeScript, like string, number, and boolean.",
      point: [
        "string → text",
        "number → numeric values",
        "boolean → true/false",
      ],
    },
    {
      id: 2,
      title: "Arrays and Tuples",
      image: "/blogs/arrays_and_tuples.png",
      summary:
        "Collections of values: arrays for same types, tuples for fixed types.",
      point: [
        "Array → multiple values of the same type",
        "Tuple → fixed-size array with specific types",
      ],
    },
    {
      id: 3,
      title: "Objects, Type Aliases, and Interfaces",
      image: "/blogs/objects_type_aliases_and_interfaces.png",
      summary:
        "Define structured data using object types and reusable type definitions.",
      point: [
        "Type Alias → define a type with a name",
        "Interface → define object structure",
      ],
    },
    {
      id: 4,
      title: "Union and Literal Types",
      image: "/blogs/union_ and_literal_types.png",
      summary:
        "Allow variables to hold multiple specific types or fixed values.",
      point: [
        "Union → value can be one of multiple types",
        "Literal → restrict to specific values",
      ],
    },
    {
      id: 5,
      title: "Functions, Optional Properties, and Generics",
      image: "/blogs/functions_optional_properties_and_generics.png",
      summary:
        "Define functions with typed parameters, optional properties, and reusable types.",
      point: [
        "Function → specify types for parameters and return",
        "Optional Property → property may or may not exist",
        "Generics → reusable, flexible types",
      ],
    },
    {
      id: 6,
      title: "Enum, Intersection, Any, Unknown, Void, Never",
      image: "/blogs/functions_optional_properties_and_generics.png",
      summary:
        "Advanced types for constants, combining types, unknown values, and special function returns.",
      point: [
        "Enum → list of constant values",
        "Intersection → combine multiple types",
        "Any → any type (use cautiously)",
        "Unknown → safer version of any",
        "Void → function returns nothing",
        "Never → function never returns",
      ],
    },
  ];
  return (
    <>
      <CategoryHero category={post} />
      <section className="container py-16 bg-secondary text-primary space-y-5 md:space-y-10">
        {typesOptions.map((option) => (
          <div key={option.id}>
            <div className="flex items-center gap-5 pb-2">
              <span className="text-[12px] sm:text-[14px] md:text-[16px] p-2 rounded-md border border-primary bg-(--bg-tertiary)/10 text-(--text-tertiary) w-8 h-8 flex items-center justify-center">
                {option.id}
              </span>
              <span className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold">
                {option.title}
              </span>
            </div>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] pl-14 pb-8">
              {option.summary}
            </p>
            <div className="flex items-center justify-center pb-5">
              <Image
                src={option.image}
                alt={option.title}
                width={1000}
                height={1000}
                className="rounded-md"
              />
            </div>

            <ul className="list-decimal space-y-2 pl-[70px]">
              {option.point.map((point) => (
                <li
                  key={point}
                  className="text-[12px] sm:text-[14px] md:text-[16px]"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}

export default Typescript;
