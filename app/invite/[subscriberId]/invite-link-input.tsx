'use client'

import { Link, Copy } from "lucide-react";

import { InputRoot, InputIcon, InputField } from "@/app/components/input";
import { IconButton } from "@/app/components/icon-button";


interface InviteLinkInputProps{
  inviteLink: string
}

export function InviteLinkInput({inviteLink} : InviteLinkInputProps) {

  function copyInviteLink(){
    navigator.clipboard.writeText(inviteLink);
  }

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>
      <InputField
        readOnly
        defaultValue={inviteLink}
      />
      <IconButton className="-mr-2" onClick={copyInviteLink}>
        <Copy className="size-5" />
      </IconButton>
    </InputRoot>
  )
}
