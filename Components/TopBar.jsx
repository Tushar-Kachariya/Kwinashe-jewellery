import { PhoneSVG, MailSVG } from '../icons/icons'
export default function Topbar() {
  return (
    <div className="topbar flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-7 px-4 sm:px-10 py-2 w-full box-border">
      <span className="topbar-item text-xs sm:text-sm">
        <PhoneSVG /> 99093-23235
      </span>
      <span className="topbar-item text-xs sm:text-sm">
        <MailSVG /> info@kohira.com
      </span>
    </div>
  )
}