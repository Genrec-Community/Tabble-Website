"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FieldErrors = Record<string, string | undefined>;

/**
 * Form field with accessible error wiring: label, aria-describedby, aria-invalid,
 * and inline errors announced with role="alert" (focus never moves on blur errors).
 */
export function Field({
  id,
  label,
  error,
  optional = false,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    "aria-required": boolean;
  }) => React.ReactNode;
  hint?: string;
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-ink-soft">(optional)</span>
        )}
      </Label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
        "aria-required": !optional,
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  id,
  label,
  error,
  optional,
  hint,
  ...inputProps
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
} & Omit<React.ComponentProps<typeof Input>, "id">) {
  return (
    <Field id={id} label={label} error={error} optional={optional} hint={hint}>
      {(p) => (
        <Input
          {...inputProps}
          {...p}
          className={`h-12 bg-card text-base ${
            error
              ? "border-destructive focus-visible:ring-destructive/30"
              : ""
          }`}
        />
      )}
    </Field>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  optional,
  hint,
  ...areaProps
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
} & Omit<React.ComponentProps<typeof Textarea>, "id">) {
  return (
    <Field id={id} label={label} error={error} optional={optional} hint={hint}>
      {(p) => (
        <Textarea
          {...areaProps}
          {...p}
          className={`min-h-32 bg-card text-base ${
            error ? "border-destructive focus-visible:ring-destructive/30" : ""
          }`}
        />
      )}
    </Field>
  );
}

export function SelectField({
  id,
  label,
  error,
  optional,
  hint,
  options,
  value,
  onValueChange,
  placeholder,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  options: string[];
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-soft">(optional)</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`h-12 w-full bg-card text-base ${
            error ? "border-destructive focus-visible:ring-destructive/30" : ""
          }`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-card">
          {options.map((o) => (
            <SelectItem key={o} value={o} className="text-base">
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
