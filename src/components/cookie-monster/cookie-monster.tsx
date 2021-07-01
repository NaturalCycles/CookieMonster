import { Component, Event, EventEmitter, h, State } from '@stencil/core'

const LS_KEY = 'cookieMonster'

@Component({
  tag: 'cookie-monster',
  styleUrl: 'cookie-monster.css',
  shadow: true,
})
export class CookieMonster {
  @State()
  private savedConsent: 'true' | 'false' | null = null

  componentWillLoad(): void {
    this.savedConsent = localStorage.getItem(LS_KEY) as 'true' | 'false' | null

    console.log(`CookieMonster: componentWillLoad, savedConsent: ${this.savedConsent}`)

    if (this.savedConsent !== null) {
      this.consentResult.emit(this.savedConsent === 'true')
    }
  }

  @Event()
  consentResult!: EventEmitter<boolean>

  private onClick(consent: boolean) {
    this.savedConsent = String(consent) as 'true' | 'false' | null
    localStorage.setItem(LS_KEY, this.savedConsent!)
    this.consentResult.emit(consent)
  }

  render(): string {
    if (this.savedConsent !== null) return ''

    return (
      <div class="container">
        <div class="container__text">Want some 🍪</div>
        <button class="container__button container__button--yes" onClick={() => this.onClick(true)}>
          Yes
        </button>
        <button class="container__button container__button--no" onClick={() => this.onClick(false)}>
          No
        </button>
      </div>
    )
  }
}
