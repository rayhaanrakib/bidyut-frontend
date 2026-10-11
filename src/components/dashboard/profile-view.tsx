"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  BadgeCheck,
  Camera,
  KeyRound,
  Pencil,
  ShieldAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import {
  useMyProfile,
  useUpdateMe,
  useUpdateMyImage,
  useUpdateMyProfile,
} from "@/hooks";
import {
  imageSchema,
  nameSchema,
  profileSchema,
  roleDetailsSchema,
} from "@/validation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input, Select } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/misc";

type NameValues = z.infer<typeof nameSchema>;
type ProfileValues = z.infer<typeof profileSchema>;
type RoleDetailsValues = z.infer<typeof roleDetailsSchema>;

const ProfileView = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const qc = useQueryClient();
  const { data, isLoading } = useMyProfile();
  const profile = data?.data.profile ?? null;
  const isCustomer = user?.role === "CUSTOMER";
  const isTechnician = user?.role === "FIELD_TECHNICIAN";
  const isOperator = user?.role === "POWER_OPERATOR";
  const isAdmin = user?.role === "ADMIN";

  const [editing, setEditing] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!pendingPhoto) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(pendingPhoto);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingPhoto]);

  const nameForm = useForm<NameValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: user?.name ?? "" },
  });

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      serviceAddress: "",
      thana: "",
      city: "",
      preferredLanguage: "en",
    },
  });

  const detailsForm = useForm<RoleDetailsValues>({
    resolver: zodResolver(roleDetailsSchema),
    defaultValues: { certification: "", phone: "", designation: "" },
  });

  useEffect(() => {
    if (user?.name) nameForm.reset({ name: user.name });
  }, [user?.name, nameForm]);

  useEffect(() => {
    if (profile) {
      profileForm.reset({
        serviceAddress: profile.serviceAddress ?? "",
        thana: profile.thana ?? "",
        city: profile.city ?? "",
        preferredLanguage: (profile.preferredLanguage as "en" | "bn") ?? "en",
      });
      detailsForm.reset({
        certification: profile.certification ?? "",
        phone: profile.phone ?? "",
        designation: profile.designation ?? "",
      });
    }
  }, [profile, profileForm, detailsForm]);

  const updateMe = useUpdateMe();
  const updateImage = useUpdateMyImage();
  const update = useUpdateMyProfile();
  const saving =
    updateMe.isPending || updateImage.isPending || update.isPending;

  const cancelEdit = () => {
    setEditing(false);
    setPendingPhoto(null);
    nameForm.reset({ name: user?.name ?? "" });
  };

  const onPickPhoto = (file?: File) => {
    if (!file) return;
    const check = imageSchema.safeParse(file);
    if (!check.success) {
      toast.error(check.error.issues[0]?.message ?? t("toast.failed"));
      return;
    }
    setPendingPhoto(file);
  };

  const save = async () => {
    const ok = await nameForm.trigger();
    if (!ok) return;
    try {
      const nameValue = nameForm.getValues().name.trim();
      if (nameValue && nameValue !== (user?.name ?? "")) {
        const res = await updateMe.mutateAsync({ name: nameValue });
        qc.setQueryData(
          ["me"],
          (
            old:
              | {
                  success: boolean;
                  message: string;
                  data: { user: typeof res.data };
                }
              | undefined,
          ) => (old ? { ...old, data: { user: res.data } } : old),
        );
      }
      if (isCustomer) {
        const v = profileForm.getValues();
        const original = {
          serviceAddress: profile?.serviceAddress ?? "",
          thana: profile?.thana ?? "",
          city: profile?.city ?? "",
          preferredLanguage:
            (profile?.preferredLanguage as "en" | "bn") ?? "en",
        };
        if (
          v.serviceAddress !== original.serviceAddress ||
          v.thana !== original.thana ||
          v.city !== original.city ||
          v.preferredLanguage !== original.preferredLanguage
        ) {
          const res = await update.mutateAsync({
            serviceAddress: v.serviceAddress,
            thana: v.thana,
            city: v.city,
            preferredLanguage: v.preferredLanguage,
          });
          qc.setQueryData(["my-profile"], res);
        }
      } else {
        const v = detailsForm.getValues();
        let changed = false;
        const payload: Record<string, string> = {};
        if (
          isTechnician &&
          v.certification !== (profile?.certification ?? "")
        ) {
          payload.certification = v.certification ?? "";
          changed = true;
        }
        if (isOperator && v.phone !== (profile?.phone ?? "")) {
          payload.phone = v.phone ?? "";
          changed = true;
        }
        if (isAdmin && v.designation !== (profile?.designation ?? "")) {
          payload.designation = v.designation ?? "";
          changed = true;
        }
        if (changed) {
          const res = await update.mutateAsync(payload);
          qc.setQueryData(["my-profile"], res);
        }
      }
      if (pendingPhoto) {
        const form = new FormData();
        form.set("image", pendingPhoto);
        const res = await updateImage.mutateAsync(form);
        qc.setQueryData(
          ["me"],
          (
            old:
              | {
                  success: boolean;
                  message: string;
                  data: { user: { imageUrl?: string } };
                }
              | undefined,
          ) =>
            old?.data?.user
              ? {
                  ...old,
                  data: {
                    user: { ...old.data.user, imageUrl: res.data.imageUrl },
                  },
                }
              : old,
        );
      }
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["me"] }),
        qc.invalidateQueries({ queryKey: ["my-profile"] }),
      ]);
      setPendingPhoto(null);
      setEditing(false);
      toast.success(t("acct.saved"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("toast.failed"));
    }
  };

  if (isLoading) return <Skeleton className="h-72 w-full rounded-3xl" />;

  const avatarSrc = previewUrl ?? user?.imageUrl ?? null;
  const roleValue = isTechnician
    ? profile?.certification
    : isOperator
      ? profile?.phone
      : profile?.designation;
  const roleLabel = isTechnician
    ? t("prof.certification")
    : isOperator
      ? t("prof.phone")
      : t("prof.designation");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
        {t("dash.profile")}
      </h1>

      {user?.mustChangePassword && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-4">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <ShieldAlert className="h-4 w-4 text-amber-600" />{" "}
            {t("prof.mustChange")}
          </p>
          <Link href="/forgot-password">
            <Button variant="outline" size="sm">
              {t("prof.changePassword")}
            </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-card p-6">
        <div className="relative">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={user?.name ?? "Profile"}
              className="h-16 w-16 rounded-2xl object-cover"
            />
          ) : (
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
              {user?.name?.[0]?.toUpperCase() ?? "B"}
            </span>
          )}
          {editing && (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  onPickPhoto(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label={t("acct.changePhoto")}
                title={t("acct.photoHint")}
                className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full border border-line bg-card text-muted shadow-sm transition hover:text-primary"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              {pendingPhoto && (
                <button
                  type="button"
                  onClick={() => setPendingPhoto(null)}
                  aria-label={t("c.cancel")}
                  className="absolute -top-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full border border-line bg-card text-muted shadow-sm transition hover:text-danger"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-foreground">{user?.name}</p>
          <p className="truncate text-sm text-muted-foreground">
            {user?.email}
          </p>
          {pendingPhoto && (
            <p className="mt-1 text-xs text-muted-foreground">
              {t("acct.photoReady")}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blue">{user?.role}</Badge>
          {isCustomer && <Badge tone="neutral">{user?.category}</Badge>}
          {isCustomer && user?.slaActive && (
            <Badge tone="emerald">
              <BadgeCheck className="mr-1 inline h-3.5 w-3.5" /> SLA
            </Badge>
          )}
          {!editing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(true)}
            >
              <Pencil className="mr-2 h-4 w-4" /> {t("acct.edit")}
            </Button>
          )}
        </div>
      </div>

      {editing && (
        <div className="rounded-3xl border border-line bg-card p-6">
          <p className="text-sm font-semibold text-foreground">
            {t("acct.editTitle")}
          </p>
          <p className="mt-1 text-xs text-muted">{t("acct.editingHint")}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
            noValidate
            className="mt-4"
          >
            <FieldGroup>
              <Field data-invalid={!!nameForm.formState.errors.name}>
                <FieldLabel htmlFor="edit-name">{t("auth.name")}</FieldLabel>
                <Input
                  id="edit-name"
                  aria-invalid={!!nameForm.formState.errors.name}
                  {...nameForm.register("name")}
                />
                <FieldError message={nameForm.formState.errors.name?.message} />
              </Field>

              {isCustomer ? (
                <>
                  <Field
                    data-invalid={!!profileForm.formState.errors.serviceAddress}
                  >
                    <FieldLabel htmlFor="edit-address">
                      {t("prof.address")}
                    </FieldLabel>
                    <Input
                      id="edit-address"
                      aria-invalid={
                        !!profileForm.formState.errors.serviceAddress
                      }
                      {...profileForm.register("serviceAddress")}
                    />
                    <FieldError
                      message={
                        profileForm.formState.errors.serviceAddress?.message
                      }
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field data-invalid={!!profileForm.formState.errors.thana}>
                      <FieldLabel htmlFor="edit-thana">
                        {t("prof.thana")}
                      </FieldLabel>
                      <Input
                        id="edit-thana"
                        aria-invalid={!!profileForm.formState.errors.thana}
                        {...profileForm.register("thana")}
                      />
                      <FieldError
                        message={profileForm.formState.errors.thana?.message}
                      />
                    </Field>
                    <Field data-invalid={!!profileForm.formState.errors.city}>
                      <FieldLabel htmlFor="edit-city">
                        {t("prof.city")}
                      </FieldLabel>
                      <Input
                        id="edit-city"
                        aria-invalid={!!profileForm.formState.errors.city}
                        {...profileForm.register("city")}
                      />
                      <FieldError
                        message={profileForm.formState.errors.city?.message}
                      />
                    </Field>
                  </div>
                  <Field
                    data-invalid={
                      !!profileForm.formState.errors.preferredLanguage
                    }
                  >
                    <FieldLabel htmlFor="edit-language">
                      {t("prof.language")}
                    </FieldLabel>
                    <Select
                      id="edit-language"
                      {...profileForm.register("preferredLanguage")}
                    >
                      <option value="en">English</option>
                      <option value="bn">বাংলা (Bangla)</option>
                    </Select>
                    <FieldError
                      message={
                        profileForm.formState.errors.preferredLanguage?.message
                      }
                    />
                  </Field>
                </>
              ) : (
                <>
                  {isTechnician && (
                    <Field
                      data-invalid={
                        !!detailsForm.formState.errors.certification
                      }
                    >
                      <FieldLabel htmlFor="edit-certification">
                        {t("prof.certification")}
                      </FieldLabel>
                      <Input
                        id="edit-certification"
                        aria-invalid={
                          !!detailsForm.formState.errors.certification
                        }
                        {...detailsForm.register("certification")}
                      />
                      <FieldError
                        message={
                          detailsForm.formState.errors.certification?.message
                        }
                      />
                    </Field>
                  )}
                  {isOperator && (
                    <Field data-invalid={!!detailsForm.formState.errors.phone}>
                      <FieldLabel htmlFor="edit-phone">
                        {t("prof.phone")}
                      </FieldLabel>
                      <Input
                        id="edit-phone"
                        type="tel"
                        aria-invalid={!!detailsForm.formState.errors.phone}
                        {...detailsForm.register("phone")}
                      />
                      <FieldError
                        message={detailsForm.formState.errors.phone?.message}
                      />
                    </Field>
                  )}
                  {isAdmin && (
                    <Field
                      data-invalid={!!detailsForm.formState.errors.designation}
                    >
                      <FieldLabel htmlFor="edit-designation">
                        {t("prof.designation")}
                      </FieldLabel>
                      <Input
                        id="edit-designation"
                        aria-invalid={
                          !!detailsForm.formState.errors.designation
                        }
                        {...detailsForm.register("designation")}
                      />
                      <FieldError
                        message={
                          detailsForm.formState.errors.designation?.message
                        }
                      />
                    </Field>
                  )}
                </>
              )}

              <div className="flex gap-2">
                <Button type="submit" loading={saving}>
                  {t("c.save")}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  {t("c.cancel")}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      )}

      {isCustomer && !editing && (
        <div className="rounded-3xl border border-line bg-card p-6">
          <p className="text-sm font-semibold text-foreground">
            {t("prof.details")}
          </p>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                {t("prof.address")}
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {profile?.serviceAddress || "—"}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                {t("prof.thana")}
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {profile?.thana || "—"}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                {t("prof.city")}
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {profile?.city || "—"}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                {t("prof.language")}
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {profile?.preferredLanguage === "bn" ? "বাংলা" : "English"}
              </p>
            </div>
          </div>
        </div>
      )}

      {!isCustomer && (
        <div className="rounded-3xl border border-line bg-card p-6">
          <p className="text-sm font-semibold text-foreground">
            {t("prof.employment")}
          </p>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                Employee ID
              </p>
              <p className="mt-1 font-mono font-semibold text-foreground">
                {profile?.employeeId ?? "—"}
              </p>
            </div>
            {isTechnician && (
              <>
                <div className="rounded-2xl border border-line bg-surface p-4">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {t("prof.specialization")}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    {profile?.specialization ?? "—"}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface p-4">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {t("prof.experienceYears")}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    {profile?.experienceYears ?? "—"}
                  </p>
                </div>
              </>
            )}
            {profile?.shift && (
              <div className="rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs uppercase tracking-wider text-muted">
                  {t("prof.shift")}
                </p>
                <p className="mt-1 font-semibold text-foreground">
                  {profile.shift}
                </p>
              </div>
            )}
            <div className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                {roleLabel}
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {roleValue || "—"}
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">{t("prof.staffNote")}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-line bg-card p-6">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <KeyRound className="h-4 w-4 text-foreground-500" />{" "}
            {t("prof.security")}
          </p>
          <p className="mt-1 text-xs text-muted">
            Password resets run through the verified email OTP flow.
          </p>
        </div>
        <Link href="/forgot-password">
          <Button variant="outline" size="sm">
            {t("prof.changePassword")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileView;
