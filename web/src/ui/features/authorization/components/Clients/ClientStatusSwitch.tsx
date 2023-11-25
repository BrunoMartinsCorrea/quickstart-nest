import { Switch, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateStatusClient } from "../../hooks/clients";
import { Client } from "@/domain/authorization";

interface ClientStatusSwitchProps {
  client: Client
}

export function ClientStatusSwitch({client}: ClientStatusSwitchProps) {
  const { t } = useTranslation();
  const [active, setActive] = useState(() => client.active);
  const updateStatusMutation = useUpdateStatusClient();

  function onChangeStatus(id: string, active: boolean) {
    setActive(active);

    updateStatusMutation.mutateAsync({id, active})
      .catch(() => setActive(!active));
  }

  return (
    <Text as="label" style={{ display: 'flex', gap: '0.5rem' }} size="2">
      {t(`labels.${active ? 'active' : 'inactive'}`)}
      <Switch checked={active} onCheckedChange={(active => onChangeStatus(client.id, active))} />
    </Text>
  )
}
