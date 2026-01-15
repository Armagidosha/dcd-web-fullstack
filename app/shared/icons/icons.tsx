export type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

export function BurgerIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Меню"}</title>
      <path d="M3 5h18" />
      <path d="M3 12h18" />
      <path d="M3 19h18" />
    </svg>
  );
}

export function CrossIcon(
  props: React.SVGProps<SVGSVGElement> & { title?: string },
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Закрыть"}</title>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <title>{props.title || "Донат"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
    </svg>
  );
}

export function RulesIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <title>{props.title || "Правила"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.997 4.17a3 3 0 0 1 2.003 2.83v12a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 2.003 -2.83a4 4 0 0 0 3.997 3.83h4a4 4 0 0 0 3.98 -3.597zm-8.987 10.83h-.01a1 1 0 0 0 -.117 1.993l.127 .007a1 1 0 0 0 0 -2m5.99 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2m-5.99 -4h-.01a1 1 0 0 0 -.117 1.993l.127 .007a1 1 0 0 0 0 -2m5.99 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2m-1 -9a2 2 0 1 1 0 4h-4a2 2 0 1 1 0 -4z" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <title>{props.title || "Домой"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Шеврон"}</title>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Прогрессия"}</title>
      <path d="M5 21v-6" />
      <path d="M12 21V9" />
      <path d="M19 21V3" />
    </svg>
  );
}

export function BrushIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Кастомизация"}</title>
      <path d="M10 2v2" />
      <path d="M14 2v4" />
      <path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" />
      <path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1" />
    </svg>
  );
}
export function ScaleIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Баланс"}</title>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}
export function PaletteIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Оформление"}</title>
      <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <title>{props.title || "Удалить"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
      <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
    </svg>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Изменить"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <title>{props.title || "Добавить"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18.333 2a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-4.333 4a1 1 0 0 0 -1 1v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0 -2h-2v-2a1 1 0 0 0 -1 -1" />
      <path d="M3.517 6.391a1 1 0 0 1 .99 1.738c-.313 .178 -.506 .51 -.507 .868v10c0 .548 .452 1 1 1h10c.284 0 .405 -.088 .626 -.486a1 1 0 0 1 1.748 .972c-.546 .98 -1.28 1.514 -2.374 1.514h-10c-1.652 0 -3 -1.348 -3 -3v-10.002a3 3 0 0 1 1.517 -2.605" />
    </svg>
  );
}

export function PaperClipIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Выбрать файл"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
    </svg>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Выход"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M9 12h12l-3 -3" />
      <path d="M18 15l3 -3" />
    </svg>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Продукты"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12l0 9" />
      <path d="M12 12l-8 -4.5" />
      <path d="M16 5.25l-8 4.5" />
    </svg>
  );
}

export function FileTextIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Политика"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M13 3v4a.997 .997 0 0 0 1 1h4" />
      <path d="M11 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v3.5" />
      <path d="M8 9h1" />
      <path d="M8 12.994l3 0" />
      <path d="M8 16.997l2 0" />
      <path d="M21 15.994c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5" />
    </svg>
  );
}

export function NewsIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Новости"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
      <path d="M8 8l4 0" />
      <path d="M8 12l4 0" />
      <path d="M8 16l4 0" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <title>{props.title || "Админка"}</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.884 2.007l.114 -.007l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>{props.title || "Проверено"}</title>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

export function LogoIconWithText(props: IconProps) {
  return (
    <svg
      width="196px"
      height="45px"
      viewBox="0 0 196 45"
      version="1.1"
      xmlSpace="preserve"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{props.title || "Логотип DraimCiDo"}</title>
      <image
        width="45"
        height="45"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ0AAAGdCAMAAAD+AV6QAAADAFBMVEUAAAD/////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;//////////////8HPQsIAAAA/3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAh&#10;IiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFla&#10;W1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKT&#10;lJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvM&#10;zc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7rCNk1AAAA&#10;AWJLR0T/pQfyxQAAF9tJREFUGBntwQlgFPXdBuB3N3cIkXAjd+RGDgERJSgIqIBRVMJRTovG8qFS&#10;LYiKSsCi2IocVitaxaJYoYVPjJ8KqKiAVkqVQwWBIAKG+wgJJCTZfT+1tSXJzu5vdndm9z8zzwOH&#10;w+FwOBwOh8NhXwlpjdIvubRfFRldu16c3jDNBYfJ6nS4Zsx9c5d8+PXxAgZy9ljelg+WPjPjrl/0&#10;vigeDgNV7zpi+mubChgkb/6ny35/e880OMKsxYg5H+QzPA6+93R251g4wuHCzJzcIwy3ovXzx6TD&#10;EYr08UvyaZx9Sya0hiMY9bIW7qHxDi7LbgSHHjF95u2gabxb5gyoBodI8k0vH6PZzq3KrgdHALXG&#10;LCtkZHjWT20Jh6bEzGWljKivctrB4YO794sFjAKf310bjopa5+xmtDiXmxUHx8/ih69ndDn4+/Zw&#10;/OjCGQcZhTaOT4TtdV1cyih1an4T2FnC7dsYzUpfuwx2lTJpP6PepjFxsKFaOcephAP3JMNm6uWc&#10;ojKO5KTCRhotLKFSjkytDpuoOfsslXMspwZsoNq0U1TSiYeSYXFx2flU1vfZMbAw1/DdVNrm/rCs&#10;Th9TeWs6wZLS5pfRAjyLG8By3NlHaRGFv4mFtXT7lBay5XJYSI0XvbQUzx9rwCoG7qflHBrjghWk&#10;LaQlfdgW6htxhBZVPMUNtdVfTgv7pCVUNuwkLe30bVBW9YW0vHcbQk3ddtIGTo6EgtwPlNIeXkmF&#10;ahp9QLN5T5w4kZ/3g92780/RRN90hFquP04zePI3vfnsw9nDBlzRvnEqKkipm95l4LiHnl6xYW8Z&#10;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&#10;"
        x="0.048843376"
        y="0.18416682"
      />
      <text
        x="50"
        y="30"
        fill="currentColor"
        fontFamily="Montserrat"
        fontWeight="500"
        fontSize="22"
      >
        DRAIMCIDO
      </text>
    </svg>
  );
}

export function LogoWithoutText(props: IconProps) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 6.3500001 6.3499998"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{props.title || "Логотип DraimCiDo"}</title>
      <image
        width="6.233849"
        height="5.9326224"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ0AAAGdCAMAAAD+AV6QAAADAFBMVEUAAAD/////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;////////////////////////////////////////////////////////////////////////////&#10;//////////////8HPQsIAAAA/3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAh&#10;IiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFla&#10;W1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKT&#10;lJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvM&#10;zc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7rCNk1AAAA&#10;AWJLR0T/pQfyxQAAF9tJREFUGBntwQlgFPXdBuB3N3cIkXAjd+RGDgERJSgIqIBRVMJRTovG8qFS&#10;LYiKSsCi2IocVitaxaJYoYVPjJ8KqKiAVkqVQwWBIAKG+wgJJCTZfT+1tSXJzu5vdndm9z8zzwOH&#10;w+FwOBwOh8NhXwlpjdIvubRfFRldu16c3jDNBYfJ6nS4Zsx9c5d8+PXxAgZy9ljelg+WPjPjrl/0&#10;vigeDgNV7zpi+mubChgkb/6ny35/e880OMKsxYg5H+QzPA6+93R251g4wuHCzJzcIwy3ovXzx6TD&#10;EYr08UvyaZx9Sya0hiMY9bIW7qHxDi7LbgSHHjF95u2gabxb5gyoBodI8k0vH6PZzq3KrgdHALXG&#10;LCtkZHjWT20Jh6bEzGWljKivctrB4YO794sFjAKf310bjopa5+xmtDiXmxUHx8/ih69ndDn4+/Zw&#10;/OjCGQcZhTaOT4TtdV1cyih1an4T2FnC7dsYzUpfuwx2lTJpP6PepjFxsKFaOcephAP3JMNm6uWc&#10;ojKO5KTCRhotLKFSjkytDpuoOfsslXMspwZsoNq0U1TSiYeSYXFx2flU1vfZMbAw1/DdVNrm/rCs&#10;Th9TeWs6wZLS5pfRAjyLG8By3NlHaRGFv4mFtXT7lBay5XJYSI0XvbQUzx9rwCoG7qflHBrjghWk&#10;LaQlfdgW6htxhBZVPMUNtdVfTgv7pCVUNuwkLe30bVBW9YW0vHcbQk3ddtIGTo6EgtwPlNIeXkmF&#10;ahp9QLN5T5w4kZ/3g92780/RRN90hFquP04zePI3vfnsw9nDBlzRvnEqKkipm95l4LiHnl6xYW8Z&#10;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&#10;"
        x="0.048843376"
        y="0.18416682"
      />
    </svg>
  );
}
