import { useState } from "react";
import { useForm } from "react-hook-form";

interface AppForm {
  department: string;
  why: string;
  salary: string;
  introduction: string;
  email: string;
  dream: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<AppForm>({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      department: "Sales",
      why: "money",
    },
  });

  const [formValues, setFormValues] = useState<AppForm | {}>({});

  const onValid = () => {
    setFormValues(getValues());
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <h1 className="text-2xl font-black text-center">
          Job Application Form
        </h1>
        <div>
          <div className="sub-title">
            What department do you want to work for?
          </div>
          <div>
            <input
              type="radio"
              value="Sales"
              id="Sales"
              {...register("department")}
            />
            <label htmlFor="Sales" className="radio-label">
              Sales
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="Marketing"
              id="Marketing"
              {...register("department")}
            />
            <label htmlFor="Marketing" className="radio-label">
              Marketing
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="Accounting"
              id="Accounting"
              {...register("department")}
            />
            <label htmlFor="Accounting" className="radio-label">
              Accounting
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="Customer"
              id="Customer"
              {...register("department")}
            />
            <label htmlFor="Customer" className="radio-label">
              Customer Service
            </label>
          </div>
        </div>
        <div>
          <div className="sub-title">Why do you want to join this company?</div>
          <div>
            <input type="radio" value="money" id="money" {...register("why")} />
            <label htmlFor="money" className="radio-label">
              I want money!
            </label>
          </div>
          <div>
            <input type="radio" value="love" id="love" {...register("why")} />
            <label htmlFor="love" className="radio-label">
              I love this company
            </label>
          </div>
          <div>
            <input type="radio" value="learn" id="learn" {...register("why")} />
            <label htmlFor="learn" className="radio-label">
              I want to learn
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="nothing"
              id="nothing"
              {...register("why")}
            />
            <label htmlFor="nothing" className="radio-label">
              I don&apos;t know why
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="salary" className="sub-title">
            Salary
          </label>
          <select
            {...register("salary")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="$50K" id="salary">
              $50K
            </option>
            <option value="$100K" id="salary">
              $100K
            </option>
            <option value="$150K" id="salary">
              $150K
            </option>
            <option value="$200K" id="salary">
              $200K
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="introduction" className="sub-title">
            Introduce yourself
          </label>
          <input
            type="text"
            id="introduction"
            {...register("introduction", {
              required: "Please write down your introduction",
            })}
            className="input-st focus:outline-none focus:shadow-outline"
          />
          <span className="error-message">{errors.introduction?.message}</span>
        </div>
        <div>
          <label htmlFor="dream" className="sub-title">
            Tell me what your dreams are
          </label>
          <textarea
            // rows="4"
            id="dream"
            {...register("dream", {
              required: "Please write down your dream",
              minLength: {
                value: 10,
                message: "Please write more than 10 characters",
              },
            })}
            className="input-st focus:outline-none focus:shadow-outline "
          ></textarea>
          <span className="error-message">{errors.dream?.message}</span>
        </div>
        <div>
          <label htmlFor="email" className="sub-title">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Please write down your email",
              validate: {
                onlyNaver: (value) =>
                  value.includes("@naver.com") || "only @naver emails allowed",
              },
            })}
            className="input-st focus:outline-none focus:shadow-outline"
          />
          <span className="error-message">{errors.email?.message}</span>
        </div>
        <button className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
          Give me this job
        </button>
        <div>
          {Object.keys(formValues).length > 0 && (
            <div className="mt-4 input-st">
              {JSON.stringify(formValues, null, 2)}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
