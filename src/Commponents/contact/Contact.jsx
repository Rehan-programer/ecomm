"use client";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import emailjs from "@emailjs/browser";
import CheckForm from "../check-out/CheckForm";
import * as Yup from "yup";

export default function ContactPage() {
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = checkout ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [checkout]);

  const validation = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(12, "Name must be less than 12 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .max(30, "Email must be less than 30 characters"),
    message: Yup.string()
      .required("Message is required")
      .max(200, "Message must be less than 200 characters"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    try {
     
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN,
        { name: values.name, email: values.email, message: values.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

     
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        { email: values.email, name: values.name, message: values.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      await fetch(
        "https://script.google.com/macros/s/AKfycbxU5XLhk508acS9Fu9Q8z9CCZiidKahYKcNcdGsaOjOLbaCoWAhsB7WcURAcZCYvJoI4w/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      resetForm();
      setCheckout(true);
      console.log("All actions completed successfully");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="w-full max-w-md bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">
          Contact Us
        </h1>

        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={values.name}
                  onChange={handleChange}
                  className="border p-3 rounded text-black w-full"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={values.email}
                  onChange={handleChange}
                  maxLength={30}
                  className="border p-3 rounded text-black w-full"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={values.message}
                  onChange={handleChange}
                  maxLength={200}
                  className="border p-3 rounded w-full text-black h-24"
                />
                {errors.message && touched.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!values.name || !values.email || !values.message || loading}
                className={`py-2 rounded text-white ${
                  !values.name || !values.email || !values.message || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {checkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setCheckout(false)}
          />
          <div className="relative bg-white rounded-lg shadow-lg md:w-[90%] lg:w-[60%] max-h-[90vh] overflow-y-auto z-50">
            <button
              onClick={() => setCheckout(false)}
              className="absolute top-3 right-3 text-white bg-red-500 py-1 px-3 rounded-full hover:bg-red-600"
            >
              ✕
            </button>
            <div className="p-6">
              <CheckForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
