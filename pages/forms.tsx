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
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AppForm>({
    mode: "onChange",
  });

  const [formValues, setFormValues] = useState<AppForm | {}>({});

  const onValid = () => {
    // console.log("data", data);
    // console.log(getValues());
    setFormValues(getValues());
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <h1>Job Application Form</h1>
        <div>
          <div>What department do you want to work for?</div>
          <div>
            <input
              type="radio"
              value="Sales"
              id="Sales"
              {...register("department")}
            />
            <label htmlFor="Sales">Sales</label>
          </div>
          <div>
            <input
              type="radio"
              value="Marketing"
              id="Marketing"
              {...register("department")}
            />
            <label htmlFor="Marketing">Marketing</label>
          </div>
          <div>
            <input
              type="radio"
              value="Accounting"
              id="Accounting"
              {...register("department")}
            />
            <label htmlFor="Accounting">Accounting</label>
          </div>
          <div>
            <input
              type="radio"
              value="Customer"
              id="Customer"
              {...register("department")}
            />
            <label htmlFor="Customer">Customer Service</label>
          </div>
        </div>
        <div>
          <div>Why do you want to join this company?</div>
          <div>
            <input type="radio" value="money" id="money" {...register("why")} />
            <label htmlFor="money">I want money!</label>
          </div>
          <div>
            <input type="radio" value="love" id="love" {...register("why")} />
            <label htmlFor="love">I love this company</label>
          </div>
          <div>
            <input type="radio" value="learn" id="learn" {...register("why")} />
            <label htmlFor="learn">I want to learn</label>
          </div>
          <div>
            <input
              type="radio"
              value="nothing"
              id="nothing"
              {...register("why")}
            />
            <label htmlFor="nothing">I don&apos;t know why</label>
          </div>
        </div>
        <div>
          <div>Salary</div>
          <select {...register("salary")}>
            <option value="$50K">$50K</option>
            <option value="$100K">$100K</option>
            <option value="$150K">$150K</option>
            <option value="$200K">$200K</option>
          </select>
        </div>
        <div>
          <div>Introduce yourself</div>
          <input
            type="text"
            {...register("introduction", {
              required: "Please write down your introduction",
            })}
          />
        </div>
        <div>
          <div>Tell me what your dreams are</div>
          <textarea
            {...register("dream", {
              required: "Please write down your dream",
            })}
          ></textarea>
        </div>
        <div>
          <label htmlFor="email">Email: </label>
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
          />
          <span>{errors.email?.message}</span>
        </div>
        <button>Give me this job</button>
      </form>
      <div>
        <div>{JSON.stringify(formValues, null, 2)}</div>
      </div>
    </>
  );
}
