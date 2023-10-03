import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Link,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Text,
  TextFieldInput,
} from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { Label } from '~/components/Label';

export function ThemeExample() {
  const { t } = useTranslation();

  return (
    <>
      <Flex direction="column">
        <Heading as="h2" size="5" mt="4">
          {t('appearance.example.title')}
        </Heading>
        <Text color="gray" size="2">
          {t('appearance.example.description')}
        </Text>
      </Flex>
      <Flex gap="4" wrap="wrap" width="100%">
        <Card style={{ maxWidth: '250px', width: '100%' }}>
          <Flex direction="column" p="2" gap="1">
            <Flex>
              <Badge>New</Badge>
            </Flex>
            <Heading>{t('appearance.example.title')}</Heading>
            <Text size="2" color="gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel error totam cumque in sed aliquam voluptates
              asperiores. Distinctio, id ut?
            </Text>
            <Link href="#" style={{ alignSelf: 'end' }}>
              Link
            </Link>
            <Flex justify="between" mt="4">
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </Flex>
          </Flex>
        </Card>
        <Card style={{ maxWidth: '400px', width: '100%' }}>
          <Flex direction="column" p="2" gap="1" justify="start">
            <Heading>{t('appearance.example.title')}</Heading>
            <Text size="2" color="gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel error totam cumque in sed aliquam voluptates
              asperiores. Distinctio, id ut?
            </Text>
            <Flex justify="between" mt="4" gap="4">
              <RadioGroup.Root defaultValue="1">
                <Flex gap="2" direction="column">
                  <Label size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="1" /> Default
                    </Flex>
                  </Label>
                  <Label size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="2" /> Comfortable
                    </Flex>
                  </Label>
                  <Label size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="3" /> Compact
                    </Flex>
                  </Label>
                </Flex>
              </RadioGroup.Root>
              <Flex direction="column" gap="4">
                <Select.Root defaultValue="apple">
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Fruits</Select.Label>
                      <Select.Item value="orange">Orange</Select.Item>
                      <Select.Item value="apple">Apple</Select.Item>
                      <Select.Item value="grape" disabled>
                        Grape
                      </Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                      <Select.Label>Vegetables</Select.Label>
                      <Select.Item value="carrot">Carrot</Select.Item>
                      <Select.Item value="potato">Potato</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                <Label size="2">
                  <Flex gap="2">
                    <Switch defaultChecked /> Sync
                  </Flex>
                </Label>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card style={{ maxWidth: '300px', width: '100%' }}>
          <Flex direction="column" p="2" gap="1">
            <Heading>{t('appearance.example.title')}</Heading>
            <Text size="2" color="gray">
              Lorem ipsum dolor sit amet consectetur
            </Text>
            <TextFieldInput mt="4" placeholder="Email" />
            <TextFieldInput mt="1" placeholder="Password" />
            <Slider mt="4" defaultValue={[50]} />
            <Flex justify="between" align="center" mt="4">
              <IconButton variant="soft">
                <MagnifyingGlassIcon />
              </IconButton>
              <Button>Submit</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
