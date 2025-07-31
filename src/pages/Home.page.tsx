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
  CheckboxGroup,
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
  DRAWER_POSITION,
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
  TabContent,
  Table,
  TabList,
  Tabs,
  Tag,
  Text,
  Textarea,
  Timepicker,
  TimepickerControl,
  TimepickerTimezoneList,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@ovhcloud/ods-react';

export const Home = () => {
  return (
    <main>
      <div className="component">
        <Text preset="heading-2">Accordion</Text>
        <Accordion>
          <AccordionItem value="0">
            <AccordionTrigger>
              Hello World!
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
        <Accordion>
          <AccordionItem
            disabled
            value="0"
          >
            <AccordionTrigger>
              Hello World!
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="1">
            <AccordionTrigger>
              Hello World!
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Badge</Text>
        <Badge>
          <Icon
            aria-label="Promotion"
            name="tag"
          />
        </Badge>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              aria-labelledby="tooltip-a11y"
              color="promotion"
              tabIndex={0}
            >
              <Icon name="tag"/>
            </Badge>
          </TooltipTrigger>
          <TooltipContent id="tooltip-a11y">
            Promotion valid from November 22 to 26
          </TooltipContent>
        </Tooltip>
        <ul
          style={{
            display: 'flex',
            flexFlow: 'row',
            gap: '8px',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}
        >
          <li>
            <Badge>
              My badge
            </Badge>
          </li>
          <li>
            <Badge>
              My badge
            </Badge>
          </li>
        </ul>
        <div
          role="list"
          style={{
            alignItems: 'center',
            display: 'flex',
            flexFlow: 'row',
            gap: '8px'
          }}
        >
          <Badge role="listitem">
            My badge
          </Badge>
          <Badge role="listitem">
            My badge
          </Badge>
        </div>
        <Badge color="alpha" size="sm">
          Alpha
        </Badge>
        <Badge color="beta" size="sm">
          Beta
        </Badge>
        <Badge color="critical" size="sm">
          Critical
        </Badge>
        <Badge color="information" size="sm">
          Information
        </Badge>
        <Badge color="neutral" size="sm">
          Neutral
        </Badge>
        <Badge color="new" size="sm">
          New
        </Badge>
        <Badge color="primary" size="sm">
          Primary
        </Badge>
        <Badge color="promotion" size="sm">
          Promotion
        </Badge>
        <Badge color="success" size="sm">
          Success
        </Badge>
        <Badge color="warning" size="sm">
          Warning
        </Badge>
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
        <Badge color="alpha" size="lg">
          Alpha
        </Badge>
        <Badge color="beta" size="lg">
          Beta
        </Badge>
        <Badge color="critical" size="lg">
          Critical
        </Badge>
        <Badge color="information" size="lg">
          Information
        </Badge>
        <Badge color="neutral" size="lg">
          Neutral
        </Badge>
        <Badge color="new" size="lg">
          New
        </Badge>
        <Badge color="primary" size="lg">
          Primary
        </Badge>
        <Badge color="promotion" size="lg">
          Promotion
        </Badge>
        <Badge color="success" size="lg">
          Success
        </Badge>
        <Badge color="warning" size="lg">
          Warning
        </Badge>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Breadcrumb</Text>
        <Breadcrumb aria-label="Breadcrumb">
          <BreadcrumbItem>
            <BreadcrumbLink
              aria-label="Home"
              href="#"
            >
              <Icon
                aria-hidden="true"
                name="home"
              />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Category
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Subcategory
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Current page
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink
              aria-label="Home"
              href="#"
            >
              <Icon name="home"/>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Parent
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              Current
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
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
        <Breadcrumb
          nbItemsAfterEllipsis={4}
          nbItemsBeforeEllipsis={1}
        >
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
        <Breadcrumb collapseThreshold={7}>
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
        <Breadcrumb noCollapse>
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
        <Text preset="heading-2">Button</Text>
        <Button>
          Clear
        </Button>
        <Button aria-label="Clear">
          <Icon name="xmark"/>
        </Button>
        <Button aria-labelledby="filter-btn">
          <Icon name="filter"/>
        </Button>
        <span id="filter-btn">
            Filter your search results
          </span>
        <Button>
          My button
        </Button>
        <Button size="xs" loading>
          Critical
        </Button>
        <Button color="critical" size="xs">
          Critical
        </Button>
        <Button color="information" size="xs">
          Information
        </Button>
        <Button color="neutral" size="xs">
          Neutral
        </Button>
        <Button color="primary" size="xs">
          Primary
        </Button>
        <Button color="success" size="xs">
          Success
        </Button>
        <Button color="warning" size="xs">
          Warning
        </Button>
        <Button size="xs" variant="outline" loading>
          Critical
        </Button>
        <Button color="critical" size="xs" variant="outline">
          Critical
        </Button>
        <Button color="information" size="xs" variant="outline">
          Information
        </Button>
        <Button color="neutral" size="xs" variant="outline">
          Neutral
        </Button>
        <Button color="primary" size="xs" variant="outline">
          Primary
        </Button>
        <Button color="success" size="xs" variant="outline">
          Success
        </Button>
        <Button color="warning" size="xs" variant="outline">
          Warning
        </Button>
        <Button size="xs" variant="ghost" loading>
          Critical
        </Button>
        <Button color="critical" size="xs" variant="ghost">
          Critical
        </Button>
        <Button color="information" size="xs" variant="ghost">
          Information
        </Button>
        <Button color="neutral" size="xs" variant="ghost">
          Neutral
        </Button>
        <Button color="primary" size="xs" variant="ghost">
          Primary
        </Button>
        <Button color="success" size="xs" variant="ghost">
          Success
        </Button>
        <Button color="warning" size="xs" variant="ghost">
          Warning
        </Button>
        <Button color="critical" size="sm" loading>
          Critical
        </Button>
        <Button color="critical" size="sm">
          Critical
        </Button>
        <Button color="information" size="sm">
          Information
        </Button>
        <Button color="neutral" size="sm">
          Neutral
        </Button>
        <Button color="primary" size="sm">
          Primary
        </Button>
        <Button color="success" size="sm">
          Success
        </Button>
        <Button color="warning" size="sm">
          Warning
        </Button>
        <Button size="sm" variant="outline" loading>
          Critical
        </Button>
        <Button color="critical" size="sm" variant="outline">
          Critical
        </Button>
        <Button color="information" size="sm" variant="outline">
          Information
        </Button>
        <Button color="neutral" size="sm" variant="outline">
          Neutral
        </Button>
        <Button color="primary" size="sm" variant="outline">
          Primary
        </Button>
        <Button color="success" size="sm" variant="outline">
          Success
        </Button>
        <Button color="warning" size="sm" variant="outline">
          Warning
        </Button>
        <Button size="sm" variant="ghost" loading>
          Critical
        </Button>
        <Button color="critical" size="sm" variant="ghost">
          Critical
        </Button>
        <Button color="information" size="sm" variant="ghost">
          Information
        </Button>
        <Button color="neutral" size="sm" variant="ghost">
          Neutral
        </Button>
        <Button color="primary" size="sm" variant="ghost">
          Primary
        </Button>
        <Button color="success" size="sm" variant="ghost">
          Success
        </Button>
        <Button color="warning" size="sm" variant="ghost">
          Warning
        </Button>
        <Button loading>
          Loading button
        </Button>
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
        <Button variant="outline" loading>
          Critical
        </Button>
        <Button color="critical" variant="outline">
          Critical
        </Button>
        <Button color="information" variant="outline">
          Information
        </Button>
        <Button color="neutral" variant="outline">
          Neutral
        </Button>
        <Button color="primary" variant="outline">
          Primary
        </Button>
        <Button color="success" variant="outline">
          Success
        </Button>
        <Button color="warning" variant="outline">
          Warning
        </Button>
        <Button variant="ghost" loading>
          Critical
        </Button>
        <Button color="critical" variant="ghost">
          Critical
        </Button>
        <Button color="information" variant="ghost">
          Information
        </Button>
        <Button color="neutral" variant="ghost">
          Neutral
        </Button>
        <Button color="primary" variant="ghost">
          Primary
        </Button>
        <Button color="success" variant="ghost">
          Success
        </Button>
        <Button color="warning" variant="ghost">
          Warning
        </Button>
        <Button size="xs" loading disabled>
          Critical
        </Button>
        <Button color="critical" size="xs" disabled>
          Critical
        </Button>
        <Button color="information" size="xs" disabled>
          Information
        </Button>
        <Button color="neutral" size="xs" disabled>
          Neutral
        </Button>
        <Button color="primary" size="xs" disabled>
          Primary
        </Button>
        <Button color="success" size="xs" disabled>
          Success
        </Button>
        <Button color="warning" size="xs" disabled>
          Warning
        </Button>
        <Button size="xs" variant="outline" loading disabled>
          Critical
        </Button>
        <Button color="critical" size="xs" variant="outline" disabled>
          Critical
        </Button>
        <Button color="information" size="xs" variant="outline" disabled>
          Information
        </Button>
        <Button color="neutral" size="xs" variant="outline" disabled>
          Neutral
        </Button>
        <Button color="primary" size="xs" variant="outline" disabled>
          Primary
        </Button>
        <Button color="success" size="xs" variant="outline" disabled>
          Success
        </Button>
        <Button color="warning" size="xs" variant="outline" disabled>
          Warning
        </Button>
        <Button size="xs" variant="ghost" loading disabled>
          Critical
        </Button>
        <Button color="critical" size="xs" variant="ghost" disabled>
          Critical
        </Button>
        <Button color="information" size="xs" variant="ghost" disabled>
          Information
        </Button>
        <Button color="neutral" size="xs" variant="ghost" disabled>
          Neutral
        </Button>
        <Button color="primary" size="xs" variant="ghost" disabled>
          Primary
        </Button>
        <Button color="success" size="xs" variant="ghost" disabled>
          Success
        </Button>
        <Button color="warning" size="xs" variant="ghost" disabled>
          Warning
        </Button>
        <Button color="critical" size="sm" loading disabled>
          Critical
        </Button>
        <Button color="critical" size="sm" disabled>
          Critical
        </Button>
        <Button color="information" size="sm" disabled>
          Information
        </Button>
        <Button color="neutral" size="sm" disabled>
          Neutral
        </Button>
        <Button color="primary" size="sm" disabled>
          Primary
        </Button>
        <Button color="success" size="sm" disabled>
          Success
        </Button>
        <Button color="warning" size="sm" disabled>
          Warning
        </Button>
        <Button size="sm" variant="outline" loading disabled>
          Critical
        </Button>
        <Button color="critical" size="sm" variant="outline" disabled>
          Critical
        </Button>
        <Button color="information" size="sm" variant="outline" disabled>
          Information
        </Button>
        <Button color="neutral" size="sm" variant="outline" disabled>
          Neutral
        </Button>
        <Button color="primary" size="sm" variant="outline" disabled>
          Primary
        </Button>
        <Button color="success" size="sm" variant="outline" disabled>
          Success
        </Button>
        <Button color="warning" size="sm" variant="outline" disabled>
          Warning
        </Button>
        <Button size="sm" variant="ghost" loading disabled>
          Critical
        </Button>
        <Button color="critical" size="sm" variant="ghost" disabled>
          Critical
        </Button>
        <Button color="information" size="sm" variant="ghost" disabled>
          Information
        </Button>
        <Button color="neutral" size="sm" variant="ghost" disabled>
          Neutral
        </Button>
        <Button color="primary" size="sm" variant="ghost" disabled>
          Primary
        </Button>
        <Button color="success" size="sm" variant="ghost" disabled>
          Success
        </Button>
        <Button color="warning" size="sm" variant="ghost" disabled>
          Warning
        </Button>
        <Button loading disabled>
          Loading button
        </Button>
        <Button color="critical" disabled>
          Critical
        </Button>
        <Button color="information" disabled>
          Information
        </Button>
        <Button color="neutral" disabled>
          Neutral
        </Button>
        <Button color="primary" disabled>
          Primary
        </Button>
        <Button color="success" disabled>
          Success
        </Button>
        <Button color="warning" disabled>
          Warning
        </Button>
        <Button variant="outline" loading disabled>
          Critical
        </Button>
        <Button color="critical" variant="outline" disabled>
          Critical
        </Button>
        <Button color="information" variant="outline" disabled>
          Information
        </Button>
        <Button color="neutral" variant="outline" disabled>
          Neutral
        </Button>
        <Button color="primary" variant="outline" disabled>
          Primary
        </Button>
        <Button color="success" variant="outline" disabled>
          Success
        </Button>
        <Button color="warning" variant="outline" disabled>
          Warning
        </Button>
        <Button variant="ghost" loading disabled>
          Critical
        </Button>
        <Button color="critical" variant="ghost" disabled>
          Critical
        </Button>
        <Button color="information" variant="ghost" disabled>
          Information
        </Button>
        <Button color="neutral" variant="ghost" disabled>
          Neutral
        </Button>
        <Button color="primary" variant="ghost" disabled>
          Primary
        </Button>
        <Button color="success" variant="ghost" disabled>
          Success
        </Button>
        <Button color="warning" variant="ghost" disabled>
          Warning
        </Button>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Card</Text>
        <ul
          style={{
            display: 'flex',
            gap: '16px',
            listStyleType: 'none',
            margin: 0,
            padding: 0
          }}
        >
          <li>
            <Card
              style={{
                padding: '8px'
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br/>
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </Card>
          </li>
          <li>
            <Card
              style={{
                padding: '8px'
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br/>
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </Card>
          </li>
        </ul>
        <div
          role="list"
          style={{
            display: 'flex',
            gap: '16px'
          }}
        >
          <Card
            role="listitem"
            style={{
              padding: '8px'
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br/>
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </Card>
          <Card
            role="listitem"
            style={{
              padding: '8px'
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br/>
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </Card>
        </div>
        <Card>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br/>
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
        </Card>
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
        <Text preset="heading-2">Text</Text>
        <Text preset="label">
          Legal considerations:
        </Text>
        <Checkbox disabled>
          <CheckboxControl/>
          <CheckboxLabel>
            Checkbox
          </CheckboxLabel>
        </Checkbox>
        <Checkbox invalid>
          <CheckboxControl/>
          <CheckboxLabel>
            Checkbox
          </CheckboxLabel>
        </Checkbox>
        <Checkbox>
          <CheckboxControl/>
          <CheckboxLabel>
            Unchecked
          </CheckboxLabel>
        </Checkbox>
        <Checkbox checked>
          <CheckboxControl/>
          <CheckboxLabel>
            Checked
          </CheckboxLabel>
        </Checkbox>
        <Checkbox checked="indeterminate">
          <CheckboxControl/>
          <CheckboxLabel>
            Indeterminate
          </CheckboxLabel>
        </Checkbox>
        <CheckboxGroup
          defaultValue={[
            'marketing'
          ]}
          name="acknowledgments"
        >
          <Checkbox value="term">
            <CheckboxControl/>
            <CheckboxLabel>
              I agree to the terms and conditions.
            </CheckboxLabel>
          </Checkbox>
          <Checkbox value="marketing">
            <CheckboxControl/>
            <CheckboxLabel>
              I agree to receive marketing communications.
            </CheckboxLabel>
          </Checkbox>
        </CheckboxGroup>
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
        <Text preset="heading-2">Clipboard</Text>
        <Clipboard value="Clipboard">
          <ClipboardControl/>
          <ClipboardTrigger/>
        </Clipboard>
        <Clipboard
          disabled
          value="Disabled"
        >
          <ClipboardControl/>
          <ClipboardTrigger/>
        </Clipboard>
        <Clipboard value="Loading">
          <ClipboardControl loading/>
          <ClipboardTrigger/>
        </Clipboard>
        <Clipboard value="Masked">
          <ClipboardControl
            maskOption={{
              enable: true
            }}
          />
          <ClipboardTrigger/>
        </Clipboard>
        <Clipboard value="Custom labels">
          <ClipboardControl/>
          <ClipboardTrigger
            labelCopy="Click to copy"
            labelCopySuccess="Successfully copied"
          />
        </Clipboard>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Code</Text>
        <Code>
          console.log('Hello world');
        </Code>
        <Code>
          {`function isTargetInElement(event, element) {
    if (!element) {
      return false;
    }
  
      return element.contains(event.target) || event.composedPath().includes(element);
    }`}
        </Code>
        <Code canCopy>
          {`import { Text } from '@ovhcloud/ods-react';`}
        </Code>
        <Code
          canCopy
          labelCopy="Click to copy"
          labelCopySuccess="Successfully copied"
        >
          console.log('Hello world');
        </Code>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Combobox</Text>
        <Combobox
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
        >
          <ComboboxControl/>
          <ComboboxContent/>
        </Combobox>
        <Combobox
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
        >
          <ComboboxControl
            clearable
            placeholder="Combobox"
          />
          <ComboboxContent/>
        </Combobox>
        <Combobox
          disabled
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
        >
          <ComboboxControl placeholder="Combobox"/>
          <ComboboxContent/>
        </Combobox>
        <Combobox
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
          readOnly
        >
          <ComboboxControl placeholder="Combobox"/>
          <ComboboxContent/>
        </Combobox>
        <Combobox
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
              label: 'World',
              value: 'world'
            }
          ]}
        >
          <ComboboxControl placeholder="Combobox"/>
          <ComboboxContent/>
        </Combobox>
        <Combobox
          invalid
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
        <Combobox items={[{
          label: 'Dog',
          value: 'dog'
        }, {
          label: 'Cat',
          value: 'cat'
        }, {
          label: 'Hamster',
          value: 'hamster'
        }, {
          label: 'Parrot',
          value: 'parrot'
        }, {
          label: 'Spider',
          value: 'spider'
        }, {
          label: 'Goldfish',
          value: 'goldfish'
        }]}>
          <ComboboxControl placeholder="Select an animal"/>
          <ComboboxContent/>
        </Combobox>
        <Combobox highlightResults items={[{
          label: 'Dog',
          value: 'dog'
        }, {
          label: 'Cat',
          value: 'cat'
        }, {
          label: 'Hamster',
          value: 'hamster'
        }, {
          label: 'Parrot',
          value: 'parrot'
        }, {
          label: 'Spider',
          value: 'spider'
        }, {
          label: 'Goldfish',
          value: 'goldfish'
        }]}>
          <ComboboxControl/>
          <ComboboxContent/>
        </Combobox>
        <Combobox multiple items={[{
          label: 'Dog',
          value: 'dog'
        }, {
          label: 'Cat',
          value: 'cat'
        }, {
          label: 'Hamster',
          value: 'hamster'
        }, {
          label: 'Parrot',
          value: 'parrot'
        }, {
          label: 'Spider',
          value: 'spider'
        }, {
          label: 'Goldfish',
          value: 'goldfish'
        }]}>
          <ComboboxControl/>
          <ComboboxContent/>
        </Combobox>
        <Combobox items={[]}>
          <ComboboxControl/>
          <ComboboxContent/>
        </Combobox>
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
        <Text preset="heading-2">Datepicker</Text>
        <FormField>
          <FormFieldLabel>
            Start date
          </FormFieldLabel>
          <Datepicker>
            <DatepickerControl/>
            <DatepickerContent/>
          </Datepicker>
        </FormField>
        <FormField>
          <FormFieldLabel>
            Start date
          </FormFieldLabel>
          <Datepicker>
            <DatepickerControl/>
            <DatepickerContent/>
          </Datepicker>
          <FormFieldHelper>
            <Text preset="caption">
              Expected format: DD-MM-YYYY
            </Text>
          </FormFieldHelper>
        </FormField>
        <Datepicker>
          <DatepickerControl/>
          <DatepickerContent/>
        </Datepicker>
        <p>
          Disabled:
        </p>
        <Datepicker disabled>
          <DatepickerControl/>
          <DatepickerContent/>
        </Datepicker>
        <p>
          Disabled Dates:
        </p>
        <Datepicker
          disabledDates={[
            new Date('2025-07-30T08:02:40.907Z'),
            new Date('2025-07-31T08:02:40.907Z'),
            new Date('2025-08-01T08:02:40.907Z')
          ]}
        >
          <DatepickerControl/>
          <DatepickerContent/>
        </Datepicker>
        <p>
          Disabled Week Days:
        </p>
        <Datepicker
          disabledWeekDays={[
            0,
            3
          ]}
        >
          <DatepickerControl/>
          <DatepickerContent/>
        </Datepicker>
        <Datepicker readOnly>
          <DatepickerControl/>
          <DatepickerContent/>
        </Datepicker>
        <Datepicker dateFormatter={({
                                      date
                                    }) => `${date.getFullYear()}`} placeholder="yyyy">
          <DatepickerControl/>

          <DatepickerContent/>
        </Datepicker>
        <Datepicker
          max={new Date("2025-08-10T08:02:41.046Z")}
          min={new Date("2025-07-21T08:02:41.046Z")}
        >
          <DatepickerControl/>
          <DatepickerContent/>
        </Datepicker>
        <Datepicker maxView="day">
          <DatepickerControl/>
          <DatepickerContent/>
        </Datepicker>
        <Datepicker minView="month">
          <DatepickerControl/>
          <DatepickerContent/>
        </Datepicker>
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
        <Text preset="heading-2">Divider</Text>
        <Divider spacing="0" color="neutral"/>
        <Divider spacing="2" color="neutral"/>
        <Divider spacing="4" color="neutral"/>
        <Divider spacing="6" color="neutral"/>
        <Divider spacing="0" color="primary"/>
        <Divider spacing="2" color="primary"/>
        <Divider spacing="4" color="primary"/>
        <Divider spacing="6" color="primary"/>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Drawer</Text>
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
        <Drawer>
          <DrawerTrigger asChild>
            <Button>
              Top drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent position={DRAWER_POSITION.top}>
            <DrawerBody>
              Top drawer content
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>
              Left drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent position={DRAWER_POSITION.left}>
            <DrawerBody>
              Left drawer content
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>
              Right Drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent position={DRAWER_POSITION.right}>
            <DrawerBody>
              Right drawer content
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>
              Bottom Drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent position={DRAWER_POSITION.bottom}>
            <DrawerBody>
              Bottom drawer content
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">FileUpload</Text>
        <FileUpload>
          <FileUploadList/>
        </FileUpload>
        <FileUpload disabled>
          <FileUploadList/>
        </FileUpload>
        <FileUpload acceptedFileLabel="Formats acceptés : images" dropzoneLabel="Glisser-déposer des fichiers"
                    maxFile={3} maxFileLabel="Nombre maximal de fichiers :" maxSize={524288000}
                    maxSizeLabel="Taille de fichier max :"
                    triggerLabel="Parcourir les fichiers">
          <FileUploadList/>
        </FileUpload>
        <FileUpload accept="image/png" acceptedFileLabel="Png files only">
          <FileUploadList/>
        </FileUpload>
        <FileUpload maxFile={3} maxFileLabel="Maximum file allowed:">
          <FileUploadList/>
        </FileUpload>
        <FileUpload maxSize={1000000} maxSizeLabel="No file larger than:">
          <FileUploadList/>
        </FileUpload>
        <FormField>
          <FormFieldLabel>
            Files:
          </FormFieldLabel>

          <FileUpload>
            <FileUploadList/>
          </FileUpload>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">FormField</Text>
        <FormField>
          <Textarea name="textarea"/>
        </FormField>
        <FormField>
          <FormFieldLabel>
            Description:
          </FormFieldLabel>
          <Textarea name="textarea"/>
        </FormField>
        <FormField>
          <Textarea name="textarea"/>
          <FormFieldHelper>
            <Text preset="caption">
              Helper text
            </Text>
          </FormFieldHelper>
        </FormField>
        <FormField invalid>
          <Textarea name="textarea"/>
          <FormFieldError>
            Error message
          </FormFieldError>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Icon</Text>
        <Icon
          aria-hidden="true"
          name="cloud"
        />
        <Icon
          aria-label="home"
          name="home"
        />
        <Icon
          aria-label="Help"
          name="circle-question"
        />
        <Icon name="home"/>
        <Icon
          aria-hidden="true"
          name="home"
        />
        <Icon
          aria-label="Help"
          name="circle-question"
        />
        <Icon name="star" tabIndex={0} aria-label="one star"/>
        <Icon name="star" tabIndex={0} aria-label="two star"/>
        <Icon name="star" tabIndex={0} aria-label="three star"/>
        <Icon name="star" tabIndex={0} aria-label="four star"/>
        <Icon name="star" tabIndex={0} aria-label="five star"/>
        <Icon name="star" role="radio" tabIndex={-1} aria-label="one star" aria-checked="false"/>
        <Icon name="star" role="radio" tabIndex={0} aria-label="two star" aria-checked="true"/>
        <Icon name="star" role="radio" tabIndex={-1} aria-label="three star" aria-checked="false"/>
        <Icon name="star" role="radio" tabIndex={-1} aria-label="four star" aria-checked="false"/>
        <Icon name="star" role="radio" tabIndex={-1} aria-label="five star" aria-checked="false"/>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Input</Text>
        <FormField>
          <FormFieldLabel>
            Name:
          </FormFieldLabel>
          <Input/>
        </FormField>
        <Input/>
        <Input disabled/>
        <Input
          defaultValue="Readonly"
          readOnly
        />
        <Input
          clearable
          defaultValue="Clearable"
        />
        <Input loading/>
        <Input
          maskOption={{
            enable: true
          }}
        />
        <Input
          placeholder="email"
          type="email"
        />
        <br/>
        <Input
          placeholder="number"
          type="number"
        />
        <br/>
        <Input
          placeholder="password"
          type="password"
        />
        <br/>
        <Input
          placeholder="search"
          type="search"
        />
        <br/>
        <Input
          placeholder="text"
          type="text"
        />
        <br/>
        <Input
          placeholder="time"
          type="time"
        />
        <br/>
        <Input
          placeholder="url"
          type="url"
        />
        <br/>
        <Input
          defaultValue="9.99"
          step="any"
          type="number"
        />
        <Input list="ice-cream-flavors"/>
        <datalist id="ice-cream-flavors">
          <option value="Chocolate"/>
          <option value="Coconut"/>
          <option value="Mint"/>
          <option value="Strawberry"/>
          <option value="Vanilla"/>
        </datalist>
        <FormField>
          <FormFieldLabel>
            Name:
          </FormFieldLabel>
          <Input/>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Link</Text>
        <Link
          aria-label="Go to homepage"
          href="https://www.ovhcloud.com"
        >
          <Icon name="home"/>
        </Link>
        <Link
          aria-label="Visit Example (opens in a new tab)"
          href="https://www.ovhcloud.com"
          target="_blank"
        >
          <Icon name="external-link"/>
        </Link>
        <Link
          aria-label="Download WCAG20 Guidelines (PDF, 481 KB)"
          href="https://www.w3.org/TR/2024/REC-WCAG21-20241212.pdf"
        >
          <Icon name="download"/>
        </Link>
        <Link href="https://www.w3.org/TR/2024/REC-WCAG21-20241212.pdf">
          <Icon name="download"/>
          <span>
      Download WCAG20 Guidelines (PDF, 481 KB)
    </span>
        </Link>
        <Link href="https://www.ovhcloud.com">
          Default Link
        </Link>
        <Link
          disabled
          href="https://www.ovhcloud.com"
        >
          Disabled
        </Link>
        <Link href="https://www.ovhcloud.com">
          <Icon name="arrow-left"/>
          Icon Link
        </Link>
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
        <Text preset="heading-2">Medium</Text>
        <Medium
          alt="OVHcloud logo"
          src="https://images.crunchbase.com/image/upload/c_pad,w_256,f_auto,q_auto:eco,dpr_1/ayzwkdawmlyzvuummuf4"
        />
        <Medium
          alt="OVHcloud logo"
          height={20}
          src="https://images.crunchbase.com/image/upload/c_pad,w_256,f_auto,q_auto:eco,dpr_1/ayzwkdawmlyzvuummuf4"
        />
        <Medium
          alt="OVHcloud logo"
          src="https://images.crunchbase.com/image/upload/c_pad,w_256,f_auto,q_auto:eco,dpr_1/ayzwkdawmlyzvuummuf4"
          width={300}
        />
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Message</Text>
        <ul
          style={{
            display: 'flex',
            flexFlow: 'column',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            rowGap: '8px'
          }}
        >
          <li>
            <Message>
              <MessageIcon name="circle-check"/>
              <MessageBody>
                Your changes have been saved.
              </MessageBody>
            </Message>
          </li>
          <li>
            <Message color="warning">
              <MessageIcon name="triangle-exclamation"/>
              <MessageBody>
                Some fields need your attention.
              </MessageBody>
            </Message>
          </li>
        </ul>
        <Message>
          <MessageIcon name="circle-info"/>
          <MessageBody>
            Default message
          </MessageBody>
        </Message>
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
        <Message color="critical" variant="light">
          <MessageIcon name="hexagon-exclamation"/>
          <MessageBody>
            Critical message
          </MessageBody>
        </Message>
        <Message color="information" variant="light">
          <MessageIcon name="circle-info"/>
          <MessageBody>
            Information message
          </MessageBody>
        </Message>
        <Message color="neutral" variant="light">
          <MessageIcon name="email"/>
          <MessageBody>
            Neutral message
          </MessageBody>
        </Message>
        <Message color="primary" variant="light">
          <MessageIcon name="lightbulb"/>
          <MessageBody>
            Primary message
          </MessageBody>
        </Message>
        <Message color="success" variant="light">
          <MessageIcon name="circle-check"/>
          <MessageBody>
            Success message
          </MessageBody>
        </Message>
        <Message color="warning" variant="light">
          <MessageIcon name="triangle-exclamation"/>
          <MessageBody>
            Warning message
          </MessageBody>
        </Message>
        <Message>
          <MessageIcon name="circle-info"/>
          <MessageBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus, libero et pharetra mattis, ipsum
            velit semper risus, non ultrices lacus massa sed arcu. Nulla sed tellus.
          </MessageBody>
        </Message>
        <Message>
          <MessageIcon name="circle-info"/>
          <MessageBody>
            Default message
          </MessageBody>
        </Message>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Modal</Text>
        <Modal>
          <ModalTrigger asChild>
            <Button>
              Trigger Modal
            </Button>
          </ModalTrigger>
          <ModalContent
            aria-describedby="modal-content"
            aria-labelledby="modal-title"
          >
            <ModalBody>
              <h2 id="modal-title">
                Delete item
              </h2>
              <p id="modal-content">
                Are you sure you want to delete this item? This action cannot be undone.
              </p>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button>
              Trigger Modal
            </Button>
          </ModalTrigger>
          <ModalContent color="critical">
            <ModalBody>
              <h2 id="modal-title">
                Delete item
              </h2>
              <p id="modal-content">
                Are you sure you want to delete this item?
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'end'
                }}
              >
                <Button variant="ghost">
                  Cancel
                </Button>
                <Button color="critical">
                  Delete
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger>
            Trigger Modal
          </ModalTrigger>
          <ModalContent>
            <ModalBody>
              My modal content
            </ModalBody>
          </ModalContent>
        </Modal>
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
        <Modal>
          <ModalTrigger asChild>
            <Button>
              Trigger Modal
            </Button>
          </ModalTrigger>

          <ModalContent dismissible={false}>
            <ModalBody>
              My modal content
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal closeOnEscape={false} closeOnInteractOutside={false}>
          <ModalTrigger asChild>
            <Button>
              Trigger Modal
            </Button>
          </ModalTrigger>

          <ModalContent>
            <ModalBody>
              My modal content
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button>
              Trigger Modal
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalBody
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '16px'
              }}
            >
              <Text preset="heading-4">
                Hosting removal
              </Text>
              <Text>
                You're about to remove the hosting "1 vCore 2,4 GHz, 2 Go RAM".
              </Text>
              <div
                style={{
                  alignSelf: 'flex-end',
                  columnGap: '8px',
                  display: 'flex'
                }}
              >
                <Button>
                  Confirm
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button>
              Trigger Modal
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalBody
              style={{
                alignItems: 'center',
                columnGap: '8px',
                display: 'grid',
                gridTemplateColumns: '1fr max-content'
              }}
            >
              <Select
                items={[
                  {
                    label: 'Dog',
                    value: 'dog'
                  },
                  {
                    label: 'Cat',
                    value: 'cat'
                  },
                  {
                    label: 'Hamster',
                    value: 'hamster'
                  },
                  {
                    label: 'Parrot',
                    value: 'parrot'
                  },
                  {
                    label: 'Spider',
                    value: 'spider'
                  },
                  {
                    label: 'Goldfish',
                    value: 'goldfish'
                  }
                ]}
              >
                <SelectControl/>
                <SelectContent/>
              </Select>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Icon
                    name="circle-question"
                    style={{
                      fontSize: '24px'
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  This is the tooltip content
                </TooltipContent>
              </Tooltip>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Pagination</Text>
        <Pagination
          aria-label="Pagination"
          totalItems={5000}
        />
        <Pagination totalItems={5000}/>
        <Pagination
          disabled
          totalItems={500}
        />
        <Pagination
          pageSize={25}
          totalItems={500}
        />
        <Pagination
          defaultPage={5}
          siblingCount={2}
          totalItems={500}
        />
        <Pagination
          labelTooltipNext="Go to next page"
          labelTooltipPrev="Go to previous page"
          totalItems={500}
        />
        <Pagination totalItems={500}
                    renderTotalItemsLabel={({totalItems}) => `of ${totalItems} results`} withPageSizeSelector/>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Password</Text>
        <FormField>
          <FormFieldLabel>
            Password:
          </FormFieldLabel>
          <Password/>
        </FormField>
        <Password/>
        <Password disabled/>
        <Password
          defaultValue="Readonly"
          readOnly
        />
        <Password
          clearable
          defaultValue="Clearable"
        />
        <Password loading/>
        <FormField>
          <FormFieldLabel>
            Password:
          </FormFieldLabel>
          <Password/>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Phone number</Text>
        <FormField>
          <FormFieldLabel>
            Phone number:
          </FormFieldLabel>
          <PhoneNumber>
            <PhoneNumberCountryList/>
            <PhoneNumberControl/>
          </PhoneNumber>
        </FormField>
        <PhoneNumber>
          <PhoneNumberControl/>
        </PhoneNumber>
        <PhoneNumber disabled>
          <PhoneNumberControl/>
        </PhoneNumber>
        <PhoneNumber disabled>
          <PhoneNumberCountryList/>
          <PhoneNumberControl/>
        </PhoneNumber>
        <PhoneNumber readOnly>
          <PhoneNumberControl/>
        </PhoneNumber>
        <PhoneNumber readOnly>
          <PhoneNumberCountryList/>
          <PhoneNumberControl/>
        </PhoneNumber>
        <PhoneNumber>
          <PhoneNumberControl clearable/>
        </PhoneNumber>
        <PhoneNumber>
          <PhoneNumberCountryList/>
          <PhoneNumberControl clearable/>
        </PhoneNumber>
        <PhoneNumber>
          <PhoneNumberControl loading/>
        </PhoneNumber>
        <PhoneNumber>
          <PhoneNumberCountryList/>
          <PhoneNumberControl loading/>
        </PhoneNumber>
        <span>
    Locale "fr"
  </span>
        <PhoneNumber locale="fr">
          <PhoneNumberCountryList/>
          <PhoneNumberControl/>
        </PhoneNumber>
        <span>
    Locale "de"
  </span>
        <PhoneNumber locale="de">
          <PhoneNumberCountryList/>
          <PhoneNumberControl/>
        </PhoneNumber>
        <span>
    All countries
  </span>
        <PhoneNumber>
          <PhoneNumberCountryList/>
          <PhoneNumberControl/>
        </PhoneNumber>
        <span>
    Subset of countries
  </span>
        <PhoneNumber
          countries={[
            'de',
            'fr',
            'gb',
            'it'
          ]}
        >
          <PhoneNumberCountryList/>
          <PhoneNumberControl clearable/>
        </PhoneNumber>
        <FormField>
          <FormFieldLabel>
            Phone number:
          </FormFieldLabel>
          <PhoneNumber>
            <PhoneNumberControl/>
          </PhoneNumber>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Popover</Text>
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <Icon
                aria-hidden="true"
                name="ellipsis-vertical"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent withArrow>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Button
                role="menuitem"
                variant="ghost"
              >
                Button
              </Button>
              <Button
                role="menuitem"
                variant="ghost"
              >
                Button
              </Button>
              <Divider
                style={{
                  width: '100%'
                }}
              />
              <Button
                color="critical"
                role="menuitem"
                variant="ghost"
              >
                Button
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            Show popover
          </PopoverTrigger>
          <PopoverContent>
            This is the popover content
          </PopoverContent>
        </Popover>
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
        <Popover>
          <PopoverTrigger asChild>
            <Icon name="cog"/>
          </PopoverTrigger>
          <PopoverContent withArrow>
            This is the popover content
          </PopoverContent>
        </Popover>
        <Popover position="top-start">
          <PopoverTrigger>
            Top Left
          </PopoverTrigger>
          <PopoverContent withArrow>
            Top Left popover
          </PopoverContent>
        </Popover>
        <Popover position="top">
          <PopoverTrigger>
            Top
          </PopoverTrigger>
          <PopoverContent withArrow>
            Top popover
          </PopoverContent>
        </Popover>
        <Popover position="top-end">
          <PopoverTrigger>
            Top Right
          </PopoverTrigger>
          <PopoverContent withArrow>
            Top Right popover
          </PopoverContent>
        </Popover>
        <Popover position="left">
          <PopoverTrigger>
            Middle Left
          </PopoverTrigger>
          <PopoverContent withArrow>
            Middle Left popover
          </PopoverContent>
        </Popover>
        <Popover position="right">
          <PopoverTrigger>
            Middle Right
          </PopoverTrigger>
          <PopoverContent withArrow>
            Middle Right popover
          </PopoverContent>
        </Popover>
        <Popover position="bottom-start">
          <PopoverTrigger>
            Bottom Left
          </PopoverTrigger>
          <PopoverContent withArrow>
            Bottom Left popover
          </PopoverContent>
        </Popover>
        <Popover position="bottom">
          <PopoverTrigger>
            Bottom
          </PopoverTrigger>
          <PopoverContent withArrow>
            Bottom popover
          </PopoverContent>
        </Popover>
        <Popover position="bottom-end">
          <PopoverTrigger>
            Bottom Right
          </PopoverTrigger>
          <PopoverContent withArrow>
            Bottom Right popover
          </PopoverContent>
        </Popover>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">ProgressBar</Text>
        <ProgressBar aria-label="Converting"/>
        <ProgressBar/>
        <ProgressBar
          max="500"
          value="50"
        />
        <ProgressBar value="50"/>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Quantity</Text>
        <FormField>
          <FormFieldLabel>
            Number of CPUs:
          </FormFieldLabel>
          <Quantity
            max={10}
            min={0}
          >
            <QuantityControl>
              <QuantityInput/>
            </QuantityControl>
          </Quantity>
        </FormField>
        <Quantity>
          <QuantityControl>
            <QuantityInput/>
          </QuantityControl>
        </Quantity>
        <Quantity disabled>
          <QuantityControl>
            <QuantityInput/>
          </QuantityControl>
        </Quantity>
        <Quantity readOnly>
          <QuantityControl>
            <QuantityInput/>
          </QuantityControl>
        </Quantity>
        <Quantity max={10}>
          <QuantityControl>
            <QuantityInput/>
          </QuantityControl>
        </Quantity>
        <Quantity step={10}>
          <QuantityControl>
            <QuantityInput/>
          </QuantityControl>
        </Quantity>
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
        <Text preset="heading-2">Radio Group</Text>
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
        <RadioGroup disabled>
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
        <RadioGroup>
          <Radio value="html">
            <RadioControl/>
            <RadioLabel>
              HTML
            </RadioLabel>
          </Radio>
          <Radio
            disabled
            value="css"
          >
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
        <RadioGroup defaultValue="html">
          <Radio
            invalid
            value="html"
          >
            <RadioControl/>
            <RadioLabel>
              HTML
            </RadioLabel>
          </Radio>
          <Radio
            invalid
            value="css"
          >
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
        <RadioGroup orientation="horizontal">
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
        <Text preset="heading-2">Range</Text>
        <FormField>
          <FormFieldLabel>
            Volume
          </FormFieldLabel>
          <Range
            defaultValue={[
              50
            ]}
          />
        </FormField>
        <FormField>
          <FormFieldLabel id="range-label">
            Price range
          </FormFieldLabel>
          <Text preset="caption" id="range-sublabel" aria-live="polite">
            Selected values:
          </Text>
          <Range aria-labelledby={['range-label', 'range-sublabel']}/>
        </FormField>
        <Range/>
        <Range
          defaultValue={[
            50,
            75
          ]}
        />
        <Range
          defaultValue={[
            20
          ]}
          disabled
        />
        <Range
          defaultValue={[
            50,
            75
          ]}
          disabled
        />
        <p>
          Max 500
        </p>
        <Range
          defaultValue={[
            50
          ]}
          max={500}
        />
        <Range
          defaultValue={[
            50,
            75
          ]}
          max={500}
        />
        <p>
          Min 25
        </p>
        <Range
          defaultValue={[
            50
          ]}
          min={25}
        />
        <Range
          defaultValue={[
            50,
            75
          ]}
          min={25}
        />
        <p>
          Max 75 & Min 25
        </p>
        <Range
          defaultValue={[
            50
          ]}
          max={75}
          min={25}
        />
        <Range
          defaultValue={[
            50,
            75
          ]}
          max={75}
          min={25}
        />
        <Range
          defaultValue={[
            20
          ]}
          step={5}
        />
        <Range
          defaultValue={[
            50,
            75
          ]}
          step={5}
        />
        <Range
          defaultValue={[
            20
          ]}
          ticks={[
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90
          ]}
        />
        <Range
          defaultValue={[
            50,
            75
          ]}
          ticks={[
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            90
          ]}
        />
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
        <Text preset="heading-2">Select</Text>
        <FormField>
          <FormFieldLabel>
            Select a Web hosting
          </FormFieldLabel>
          <Select
            items={[
              {
                label: '1 vCore 2,4 GHz, 2 Go RAM',
                value: 'hosting-1'
              },
              {
                label: '1 vCore 2,4 GHz, 4 Go RAM',
                value: 'hosting-2'
              },
              {
                label: '2 vCores 2,4 GHz, 8 Go RAM',
                value: 'hosting-3'
              }
            ]}
          >
            <SelectControl/>
            <SelectContent/>
          </Select>
        </FormField>
        <Select
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
        >
          <SelectControl/>
          <SelectContent/>
        </Select>
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
        <Select
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
          multiple
        >
          <Text
            htmlFor="multiple"
            preset="label"
          >
            Default multiple selection
          </Text>
          <SelectControl
            id="multiple"
            placeholder="Select one or more pets"
          />
          <SelectContent/>
        </Select>
        <Select
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
          multiple="merge"
        >
          <Text
            htmlFor="multiple-merged"
            preset="label"
          >
            Merged multiple selection
          </Text>
          <SelectControl
            id="multiple-merged"
            placeholder="Select one or more pets"
          />
          <SelectContent/>
        </Select>
        <Select
          disabled
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
        >
          <Text
            htmlFor="disabled"
            preset="label"
          >
            Disabled
          </Text>
          <SelectControl
            id="disabled"
            placeholder="Select one or more pets"
          />
          <SelectContent/>
        </Select>
        <Select
          items={[
            {
              disabled: true,
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              disabled: true,
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
        >
          <Text
            htmlFor="disabled-options"
            preset="label"
          >
            Disabled options
          </Text>
          <SelectControl
            id="disabled-options"
            placeholder="Select one or more pets"
          />
          <SelectContent/>
        </Select>
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
                  disabled: true,
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
              disabled: true,
              label: 'Asia',
              options: [
                {
                  disabled: true,
                  label: 'China',
                  value: 'cn'
                },
                {
                  disabled: true,
                  label: 'Japan',
                  value: 'jp'
                },
                {
                  disabled: true,
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
          <Text
            htmlFor="disabled-group"
            preset="label"
          >
            Disabled group or group option
          </Text>
          <SelectControl id="disabled-group"/>
          <SelectContent/>
        </Select>
        <Select
          items={[
            {
              label: 'Dog',
              value: 'dog'
            },
            {
              label: 'Cat',
              value: 'cat'
            },
            {
              label: 'Hamster',
              value: 'hamster'
            },
            {
              label: 'Parrot',
              value: 'parrot'
            },
            {
              label: 'Spider',
              value: 'spider'
            },
            {
              label: 'Goldfish',
              value: 'goldfish'
            }
          ]}
          readOnly
        >
          <SelectControl placeholder="Select one or more pets"/>
          <SelectContent/>
        </Select>
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
        <Text preset="heading-2">Skeleton</Text>
        <div aria-busy="true">
          <Skeleton/>
        </div>
        <Skeleton/>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Spinner</Text>
        <div
          aria-busy="true"
          aria-live="polite"
        >
          <Spinner/>
        </div>
        <Spinner aria-label="Loading user profile"/>
        <div>
  <span id="loading-text">
    Loading user profile
  </span>
          <Spinner aria-labelledby="loading-text"/>
        </div>
        <Spinner color="neutral" size="xs"/>
        <Spinner color="primary" size="xs"/>
        <Spinner color="neutral" size="sm"/>
        <Spinner color="primary" size="sm"/>
        <Spinner color="neutral"/>
        <Spinner color="primary"/>
        <Spinner color="neutral" size="lg"/>
        <Spinner color="primary" size="lg"/>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Switch</Text>
        <Switch aria-label="Select an item">
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
        <Text
          id="switch-label"
          preset="label"
        >
          Select an item:
        </Text>
        <Switch aria-labelledby="switch-label">
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
        <Switch>
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
        <Switch disabled>
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
        <Switch size="md">
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
        <Switch size="sm">
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
        <Text preset="heading-2">Table</Text>
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
        <Table size="md">
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
        <Table size="lg">
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
        <Table variant="default">
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
        <Table variant="striped">
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
        <Table>
          <caption>
            <Text preset="caption">
              Front-end web developer course 2021
            </Text>
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
        <Text preset="heading-2">Tabs</Text>
        <Tabs>
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
          </TabList>
        </Tabs>
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">
              Tab 1
            </Tab>
            <Tab
              disabled
              value="tab2"
            >
              Tab 2
            </Tab>
            <Tab value="tab3">
              Tab 3
            </Tab>
          </TabList>
        </Tabs>
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
          </TabList>
          <TabContent value="tab1">
            <p>
              Content 1
            </p>
          </TabContent>
          <TabContent value="tab2">
            <p>
              Content 2
            </p>
          </TabContent>
          <TabContent value="tab3">
            <p>
              Content 3
            </p>
          </TabContent>
        </Tabs>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Tag</Text>
        <ul>
          <li>
            <Tag>
              Design
            </Tag>
          </li>
          <li>
            <Tag>
              Development
            </Tag>
          </li>
          <li>
            <Tag>
              Accessibility
            </Tag>
          </li>
        </ul>
        <div role="list">
          <div role="listitem">
            <Tag>
              Design
            </Tag>
          </div>
          <div role="listitem">
            <Tag>
              Development
            </Tag>
          </div>
          <div role="listitem">
            <Tag>
              Accessibility
            </Tag>
          </div>
        </div>
        <Tag aria-label="Remove my tag">
          My tag
        </Tag>
        <Tag>
          My tag
        </Tag>
        <Tag disabled>
          My tag
        </Tag>
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
        <Tag color="critical" size="lg">
          Critical
        </Tag>
        <Tag color="information" size="lg">
          Information
        </Tag>
        <Tag color="neutral" size="lg">
          Neutral
        </Tag>
        <Tag color="primary" size="lg">
          Primary
        </Tag>
        <Tag color="success" size="lg">
          Success
        </Tag>
        <Tag color="warning" size="lg">
          Warning
        </Tag>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Text</Text>
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
        <table
          style={{
            border: '2px solid rgb(140 140 140)',
            borderCollapse: 'collapse'
          }}
        >
          <caption
            style={{
              captionSide: 'bottom'
            }}
          >
            <Text preset="caption">
              My table title
            </Text>
          </caption>
          <thead>
          <tr>
            <th scope="col">
              Person
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
              22
            </td>
          </tr>
          </tbody>
        </table>
        <figure>
          <img
            alt="OVHcloud logo"
            src="https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/ayzwkdawmlyzvuummuf4"
            style={{
              height: '100px'
            }}
          />
          <figcaption>
            <Text preset="caption">
              My picture title
            </Text>
          </figcaption>
        </figure>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Textarea</Text>
        <FormField>
          <FormFieldLabel>
            Description:
          </FormFieldLabel>
          <Textarea/>
        </FormField>
        <FormField>
          <FormFieldLabel>
            Description:
          </FormFieldLabel>
          <Textarea/>
          <FormFieldHelper>
            Enter a brief description
          </FormFieldHelper>
        </FormField>
        <Textarea/>
        <Textarea disabled/>
        <Textarea
          defaultValue="Readonly"
          readOnly
        />
        <Textarea
          style={{
            resize: 'both'
          }}
        />
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
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Timepicker</Text>
        <FormField>
          <FormFieldLabel>
            Starting time:
          </FormFieldLabel>
          <Timepicker withSeconds>
            <TimepickerControl/>
            <TimepickerTimezoneList/>
          </Timepicker>
        </FormField>
        <Timepicker>
          <TimepickerControl/>
        </Timepicker>
        <Timepicker disabled>
          <TimepickerControl/>
        </Timepicker>
        <Timepicker disabled>
          <TimepickerControl/>
          <TimepickerTimezoneList/>
        </Timepicker>
        <Timepicker readOnly>
          <TimepickerControl/>
        </Timepicker>
        <Timepicker readOnly>
          <TimepickerControl/>
          <TimepickerTimezoneList/>
        </Timepicker>
        <Timepicker withSeconds>
          <TimepickerControl/>
        </Timepicker>
        <Timepicker withSeconds>
          <TimepickerControl/>
          <TimepickerTimezoneList/>
        </Timepicker>
        <span>
    All timezones
  </span>
        <Timepicker>
          <TimepickerControl/>
          <TimepickerTimezoneList/>
        </Timepicker>
        <span>
    Subset of timezone
  </span>
        <Timepicker
          timezones={[
            'UTC-10',
            'UTC+0',
            'UTC+10'
          ]}
        >
          <TimepickerControl/>
          <TimepickerTimezoneList/>
        </Timepicker>
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
        <Text preset="heading-2">Toggle</Text>
        <FormField>
          <FormFieldLabel>
            Dark mode
          </FormFieldLabel>
          <Toggle />
        </FormField>
        <Toggle aria-label="Enable dark mode" />
        <Toggle />
        <Toggle disabled />
        <Toggle invalid />
        <Toggle withLabels />
        <FormField>
          <FormFieldLabel>
            Dark mode
          </FormFieldLabel>
          <Toggle withLabels/>
        </FormField>
      </div>
      <br/>
      <div className="component">
        <Text preset="heading-2">Tooltip</Text>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon
              aria-hidden
              name="circle-info"
              style={{
                fontSize: '24px'
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            Some additional context.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            Show tooltip
          </TooltipTrigger>
          <TooltipContent>
            This is the tooltip content
          </TooltipContent>
        </Tooltip>
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