import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
  Clipboard,
  ClipboardControl,
  ClipboardTrigger,
  Code,
  Combobox,
  ComboboxContent,
  ComboboxControl,
  Datepicker,
  DatepickerContent,
  DatepickerControl,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerTrigger,
  FileUpload,
  FileUploadList,
  FormField,
  FormFieldError,
  FormFieldHelper,
  FormFieldLabel,
  Icon,
  Input,
  Link,
  Medium,
  Message,
  MessageBody,
  MessageIcon,
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  Pagination,
  Password,
  PhoneNumber,
  PhoneNumberControl,
  PhoneNumberCountryList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProgressBar,
  Quantity,
  QuantityControl,
  QuantityInput,
  Radio,
  RadioControl,
  RadioGroup,
  RadioLabel,
  Range,
  Select,
  SelectContent,
  SelectControl,
  Skeleton,
  Spinner,
  Switch,
  SwitchItem,
  Tab,
  Table,
  TabList,
  Tabs,
  Tag,
  Text,
  Textarea,
  Timepicker,
  TimepickerControl,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@ovhcloud/ods-react';

export const Home = () => {
  return (
    <main>
      <div className="component">
        <Accordion>
          <AccordionItem value="1">
            <AccordionTrigger>
              <Text preset="heading-4">
                Multiple
              </Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text preset="paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>
              <Text preset="heading-4">
                Multiple
              </Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text preset="paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <br/>
      <div className="component">
        <Badge color="alpha">
          Alpha
        </Badge>
        <Badge color="beta">
          Beta
        </Badge>
        <Badge color="critical">
          Critical
        </Badge>
        <Badge color="information">
          Information
        </Badge>
        <Badge color="neutral">
          Neutral
        </Badge>
        <Badge color="new">
          New
        </Badge>
        <Badge color="primary">
          Primary
        </Badge>
        <Badge color="promotion">
          Promotion
        </Badge>
        <Badge color="success">
          Success
        </Badge>
        <Badge color="warning">
          Warning
        </Badge>
      </div>
      <br/>
      <div className="component">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Hosting
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Servers
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Dedicated
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Rise
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              RISE-2
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <br/>
      <div className="component">
        <Button color="critical">
          Critical
        </Button>
        <Button color="information">
          Information
        </Button>
        <Button color="neutral">
          Neutral
        </Button>
        <Button color="primary">
          Primary
        </Button>
        <Button color="success">
          Success
        </Button>
        <Button color="warning">
          Warning
        </Button>
      </div>
      <br/>
      <div className="component">
        <Card color="critical">
          <p>
            Critical
          </p>
        </Card>
        <Card color="information">
          <p>
            Information
          </p>
        </Card>
        <Card color="neutral">
          <p>
            Neutral
          </p>
        </Card>
        <Card color="primary">
          <p>
            Primary
          </p>
        </Card>
        <Card color="success">
          <p>
            Success
          </p>
        </Card>
        <Card color="warning">
          <p>
            Warning
          </p>
        </Card>
      </div>
      <br/>
      <div className="component">
        <Text preset="label">
          Legal considerations:
        </Text>
        <FormField>
          <Checkbox>
            <CheckboxControl/>
            <CheckboxLabel>
              I agree to the terms and conditions.
            </CheckboxLabel>
          </Checkbox>
        </FormField>
        <FormField>
          <Checkbox>
            <CheckboxControl/>
            <CheckboxLabel>
              I agree to receive marketing communications.
            </CheckboxLabel>
          </Checkbox>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Clipboard value="Clipboard">
          <ClipboardControl/>
          <ClipboardTrigger/>
        </Clipboard>
      </div>
      <br/>
      <div className="component">
        <Code canCopy>
          {`import { Text } from '@ovhcloud/ods-react';`}
        </Code>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Combobox
          </FormFieldLabel>
          <Combobox
            items={[
              {
                label: 'Dog',
                value: 'dog'
              },
              {
                label: 'Cat',
                value: 'cat'
              }
            ]}
          >
            <ComboboxControl/>
            <ComboboxContent/>
          </Combobox>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Label:
          </FormFieldLabel>
          <Datepicker>
            <DatepickerControl/>
            <DatepickerContent/>
          </Datepicker>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Divider/>
      </div>
      <br/>
      <div className="component">
        <Drawer>
          <DrawerTrigger asChild>
            <Button>
              Trigger Drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerBody>
              My drawer content
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      <br/>
      <div className="component">
        <FileUpload disabled>
          <FileUploadList/>
        </FileUpload>
      </div>
      <br/>
      <div className="component">
        <Icon
          aria-label="Help"
          name="circle-question"
        />
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Name:
          </FormFieldLabel>
          <Input clearable/>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Link
          href="https://www.ovhcloud.com"
          style={{
            justifySelf: 'right'
          }}
        >
          Icon Link
          <Icon name="arrow-right"/>
        </Link>
      </div>
      <br/>
      <div className="component">
        <Medium
          alt="OVHcloud logo"
          src="https://images.crunchbase.com/image/upload/c_pad,w_256,f_auto,q_auto:eco,dpr_1/ayzwkdawmlyzvuummuf4"
        />
      </div>
      <br/>
      <div className="component">
        <Message color="critical">
          <MessageIcon name="hexagon-exclamation"/>
          <MessageBody>
            Critical message
          </MessageBody>
        </Message>
        <Message color="information">
          <MessageIcon name="circle-info"/>
          <MessageBody>
            Information message
          </MessageBody>
        </Message>
        <Message color="neutral">
          <MessageIcon name="email"/>
          <MessageBody>
            Neutral message
          </MessageBody>
        </Message>
        <Message color="primary">
          <MessageIcon name="lightbulb"/>
          <MessageBody>
            Primary message
          </MessageBody>
        </Message>
        <Message color="success">
          <MessageIcon name="circle-check"/>
          <MessageBody>
            Success message
          </MessageBody>
        </Message>
        <Message color="warning">
          <MessageIcon name="triangle-exclamation"/>
          <MessageBody>
            Warning message
          </MessageBody>
        </Message>
      </div>
      <br/>
      <div className="component">
        <Modal>
          <ModalTrigger asChild>
            <Button color="critical">
              Critical
            </Button>
          </ModalTrigger>
          <ModalContent color="critical">
            <ModalBody>
              Critical
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button color="information">
              Information
            </Button>
          </ModalTrigger>
          <ModalContent color="information">
            <ModalBody>
              Information
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button color="neutral">
              Neutral
            </Button>
          </ModalTrigger>
          <ModalContent color="neutral">
            <ModalBody>
              Neutral
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button color="primary">
              Primary
            </Button>
          </ModalTrigger>
          <ModalContent color="primary">
            <ModalBody>
              Primary
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button color="success">
              Success
            </Button>
          </ModalTrigger>
          <ModalContent color="success">
            <ModalBody>
              Success
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button color="warning">
              Warning
            </Button>
          </ModalTrigger>
          <ModalContent color="warning">
            <ModalBody>
              Warning
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      <br/>
      <div className="component">
        <Pagination totalItems={500}
                    renderTotalItemsLabel={({totalItems}) => `of ${totalItems} results`} withPageSizeSelector/>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Password:
          </FormFieldLabel>
          <Password clearable/>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Phone number:
          </FormFieldLabel>
          <PhoneNumber>
            <PhoneNumberCountryList/>
            <PhoneNumberControl/>
          </PhoneNumber>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              Custom Trigger
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            This is the popover content
          </PopoverContent>
        </Popover>
      </div>
      <br/>
      <div className="component">
        <ProgressBar value="50"/>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Set a quantity:
          </FormFieldLabel>
          <Quantity>
            <QuantityControl>
              <QuantityInput/>
            </QuantityControl>
          </Quantity>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Pick a language:
          </FormFieldLabel>
          <RadioGroup>
            <Radio value="html">
              <RadioControl/>
              <RadioLabel>
                HTML
              </RadioLabel>
            </Radio>
            <Radio value="css">
              <RadioControl/>
              <RadioLabel>
                CSS
              </RadioLabel>
            </Radio>
            <Radio value="js">
              <RadioControl/>
              <RadioLabel>
                JavaScript
              </RadioLabel>
            </Radio>
          </RadioGroup>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Range:
          </FormFieldLabel>
          <Range
            defaultValue={[
              50,
              75
            ]}
            step={5}
          />
        </FormField>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Select a Web hosting
          </FormFieldLabel>
          <Select
            items={[
              {
                label: 'Europe',
                options: [
                  {
                    label: 'France',
                    value: 'fr'
                  },
                  {
                    label: 'Germany',
                    value: 'de'
                  },
                  {
                    label: 'Italy',
                    value: 'it'
                  }
                ]
              },
              {
                label: 'Asia',
                options: [
                  {
                    label: 'China',
                    value: 'cn'
                  },
                  {
                    label: 'Japan',
                    value: 'jp'
                  },
                  {
                    label: 'Russia',
                    value: 'ru'
                  }
                ]
              },
              {
                label: 'North America',
                options: [
                  {
                    label: 'Canada',
                    value: 'ca'
                  },
                  {
                    label: 'Mexico',
                    value: 'mx'
                  },
                  {
                    label: 'United States of America',
                    value: 'us'
                  }
                ]
              }
            ]}
          >
            <SelectControl/>
            <SelectContent/>
          </Select>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Skeleton/>
      </div>
      <br/>
      <div className="component">
        <Spinner/>
      </div>
      <br/>
      <div className="component">
        <Switch defaultValue="item-1">
          <SwitchItem value="item-1">
            Item 1
          </SwitchItem>
          <SwitchItem value="item-2">
            Item 2
          </SwitchItem>
          <SwitchItem value="item-3">
            Item 3
          </SwitchItem>
        </Switch>
      </div>
      <br/>
      <div className="component">
        <Table size="sm">
          <caption>
            Front-end web developer course 2021
          </caption>
          <thead>
          <tr>
            <th scope="col">
              Person
            </th>
            <th scope="col">
              Most interest in
            </th>
            <th scope="col">
              Age
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">
              Chris
            </th>
            <td>
              HTML tables
            </td>
            <td>
              22
            </td>
          </tr>
          <tr>
            <th scope="row">
              Dennis
            </th>
            <td>
              Web accessibility
            </td>
            <td>
              45
            </td>
          </tr>
          <tr>
            <th scope="row">
              Sarah
            </th>
            <td>
              JavaScript frameworks
            </td>
            <td>
              29
            </td>
          </tr>
          <tr>
            <th scope="row">
              Karen
            </th>
            <td>
              Web performance
            </td>
            <td>
              36
            </td>
          </tr>
          </tbody>
        </Table>
      </div>
      <br/>
      <div className="component">
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">
              Tab 1
            </Tab>
            <Tab value="tab2">
              Tab 2
            </Tab>
            <Tab value="tab3">
              Tab 3
            </Tab>
            <Tab value="tab4">
              Tab 4
            </Tab>
            <Tab value="tab5">
              Tab 5
            </Tab>
            <Tab value="tab6">
              Tab 6
            </Tab>
          </TabList>
        </Tabs>
      </div>
      <br/>
      <div className="component">
        <Tag color="critical">
          Critical
        </Tag>
        <Tag color="information">
          Information
        </Tag>
        <Tag color="neutral">
          Neutral
        </Tag>
        <Tag color="primary">
          Primary
        </Tag>
        <Tag color="success">
          Success
        </Tag>
        <Tag color="warning">
          Warning
        </Tag>
      </div>
      <br/>
      <div className="component">
        <Text preset="caption">
          Caption
        </Text>
        <br/>
        <Text preset="code">
          Code
        </Text>
        <br/>
        <Text preset="label">
          Label
        </Text>
        <Text preset="paragraph">
          Paragraph
        </Text>
        <Text preset="span">
          Span
        </Text>
        <br/>
        <Text preset="heading-1">
          Heading-1
        </Text>
        <Text preset="heading-2">
          Heading-2
        </Text>
        <Text preset="heading-3">
          Heading-3
        </Text>
        <Text preset="heading-4">
          Heading-4
        </Text>
        <Text preset="heading-5">
          Heading-5
        </Text>
        <Text preset="heading-6">
          Heading-6
        </Text>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Description:
          </FormFieldLabel>
          <Textarea
            name="description"
            onInput={function Xs() {
            }}
          />
          <FormFieldHelper
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Text preset="caption">
              Helper text
            </Text>
            <Text preset="caption">
              0/200
            </Text>
          </FormFieldHelper>
          <FormFieldError>
            Error message
          </FormFieldError>
        </FormField>
        <FormField>
          <FormFieldLabel>
            Timepicker:
          </FormFieldLabel>
          <Timepicker>
            <TimepickerControl/>
          </Timepicker>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <FormField>
          <FormFieldLabel>
            Dark mode
          </FormFieldLabel>
          <Toggle withLabels/>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon name="circle-question"/>
          </TooltipTrigger>
          <TooltipContent>
            This is the tooltip content
          </TooltipContent>
        </Tooltip>
      </div>
    </main>
  )
};