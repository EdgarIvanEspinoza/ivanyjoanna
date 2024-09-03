'use client';

import React, { useState } from 'react';

const RSVP = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    attending: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(form);
  };

  return (
    <section id="rsvp" className="p-8">
      <h2 className="text-center text-4xl text-green-800 mb-4">RSVP</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 text-lg border-2 border-green-700 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 text-lg border-2 border-green-700 rounded-md"
        />
        <select
          name="attending"
          value={form.attending}
          onChange={handleChange}
          className="p-2 text-lg border-2 border-green-700 rounded-md"
        >
          <option value="">Are you attending?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button
          type="submit"
          className="p-2 text-lg bg-green-700 text-white rounded-md hover:bg-green-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default RSVP;
