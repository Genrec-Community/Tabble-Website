"use client";

import React, { useRef, useState } from "react";

/**
 * Form state machine per form-validation craft:
 * - pristine: no chrome
 * - dirty (typing): no chrome
 * - touched (blur after edit): field-level validation fires
 * - invalid: re-validate on input so errors clear immediately
 * - submit: validate all, focus first invalid field
 */
export function useForm<T extends Record<string, string>>(
  initial: T,
  validators: Partial<Record<keyof T, (v: string) => string | undefined>>
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const refs = useRef<Partial<Record<keyof T, HTMLElement | null>>>({});

  const registerRef = (name: keyof T) => (el: HTMLElement | null) => {
    refs.current[name] = el;
  };

  const setField = (name: keyof T, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // once invalid, re-validate on every input so the error clears the moment it's fixed
    if (errors[name]) {
      const err = validators[name]?.(value);
      setErrors((e) => ({ ...e, [name]: err }));
    }
  };

  const blurField = (name: keyof T) => {
    const err = validators[name]?.(values[name]);
    setErrors((e) => ({ ...e, [name]: err }));
  };

  const validateAll = (): boolean => {
    const next: Partial<Record<keyof T, string>> = {};
    (Object.keys(validators) as (keyof T)[]).forEach((k) => {
      const err = validators[k]?.(values[k]);
      if (err) next[k] = err;
    });
    setErrors(next);
    const invalidKeys = Object.keys(next) as (keyof T)[];
    if (invalidKeys.length > 0) {
      const first = invalidKeys.find((k) => refs.current[k]);
      (refs.current[first as keyof T] as HTMLElement | null)?.focus();
      return false;
    }
    return true;
  };

  const setServerError = (serverErrors: Record<string, string>) => {
    setErrors((prev) => ({ ...prev, ...serverErrors }));
    const first = Object.keys(serverErrors)[0] as keyof T | undefined;
    if (first && refs.current[first]) {
      (refs.current[first] as HTMLElement | null)?.focus();
    }
  };

  return {
    values,
    errors,
    setField,
    blurField,
    validateAll,
    registerRef,
    setErrors,
    setServerError,
  };
}

/* ---- adaptive validators (specific subrule messages, not catch-alls) ---- */

export function validateEmail(v: string): string | undefined {
  const email = v.trim();
  if (!email) return "Email is required — this is where we send your access link.";
  if (/\s/.test(email)) return "Email can't contain spaces. Check for typos.";
  if (!email.includes("@"))
    return "Email needs an @ sign — e.g. you@restaurant.com.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return "That doesn't look like a complete email — e.g. you@restaurant.com.";
  return undefined;
}

export function validateRequired(fieldName: string, v: string): string | undefined {
  if (!v.trim()) return `${fieldName} is required.`;
  return undefined;
}

export function validatePhone(v: string): string | undefined {
  const digits = v.replace(/\D/g, "");
  if (!v.trim()) return undefined; // optional
  if (digits.length < 10)
    return "Phone number needs at least 10 digits — include the country code if outside India.";
  if (digits.length > 13) return "That's more than 13 digits — please double-check the number.";
  if (/[^+\d\s()-]/.test(v)) return "Phone can only contain digits, spaces, and + ( ) - characters.";
  return undefined;
}
