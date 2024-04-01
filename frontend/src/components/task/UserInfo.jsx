import { Popover, Transition } from "@headlessui/react";

export default function UserInfo() {
  return (
    <Popover>
      <Popover.Button>Solutions</Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel>{/* ... */}</Popover.Panel>
      </Transition>
    </Popover>
  );
}
