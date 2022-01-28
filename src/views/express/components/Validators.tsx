import { Card } from "../../../components/Card"

export const Validators = () => {
  return <div className="container">
    <div className="text-[36px] leading-[44px] text-2e2d33 tracking-[0.04em] text-center font-bold">Current Validators</div>
    <div className="mt-[62px] w-full grid grid-cols-2 gap-38 text-4f4f4f text-16 leading-[24px]">
      <Card className="flex pt-38 pl-32 pb-32">
        <div className="w-64 h-64 border border-f1f0f2 rounded-circle"></div>
        <div className="flex flex-col ml-32">
          <span>Slash Number: <span className="text-primary">1111</span></span>
          <span className="mt-4 mb-8 text-333 text-20 font-semibold">Validator 1</span>
          <span>04.01.2022</span>
        </div>
      </Card>
      <Card className="flex pt-38 pl-32 pb-32">
        <div className="w-64 h-64 border border-f1f0f2 rounded-circle"></div>
        <div className="flex flex-col ml-32">
          <span>Slash Number: <span className="text-primary">1111</span></span>
          <span className="mt-4 mb-8 text-333 text-20 font-semibold">Validator 1</span>
          <span>04.01.2022</span>
        </div>
      </Card>
      <Card className="flex pt-38 pl-32 pb-32">
        <div className="w-64 h-64 border border-f1f0f2 rounded-circle"></div>
        <div className="flex flex-col ml-32">
          <span>Slash Number: <span className="text-primary">1111</span></span>
          <span className="mt-4 mb-8 text-333 text-20 font-semibold">Validator 1</span>
          <span>04.01.2022</span>
        </div>
      </Card>
      <Card className="flex pt-38 pl-32 pb-32">
        <div className="w-64 h-64 border border-f1f0f2 rounded-circle"></div>
        <div className="flex flex-col ml-32">
          <span>Slash Number: <span className="text-primary">1111</span></span>
          <span className="mt-4 mb-8 text-333 text-20 font-semibold">Validator 1</span>
          <span>04.01.2022</span>
        </div>
      </Card>
    </div>
  </div>
}