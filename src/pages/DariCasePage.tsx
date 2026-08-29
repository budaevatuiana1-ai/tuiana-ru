import { useEffect } from 'react'
import './DariCasePage.css'
import { ruTypo } from '../lib/typography'
import CtaButton from '../CtaButton'
import ContactSection from '../ContactSection'
import Footer from '../Footer'

const BASE = import.meta.env.BASE_URL

export default function DariCasePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className="dari-page">      <div className="dari-page__hero">
        <div className="dari-page__hero-inner">
          <div className="dari-page__text">
            <p className="dari-page__eyebrow">
              КЕЙС 01 / <span className="dari-page__eyebrow-accent">МЕДИЦИНСКИЙ САЙТ</span>
            </p>
            <h1 className="dari-page__title">DARI</h1>
            <p className="dari-page__subtitle">
              {ruTypo('Многостраничный сайт центра эстетической косметологии')}
            </p>
            <p className="dari-page__desc">
              {ruTypo(
                'Не просто новый дизайн, а единая цифровая система клиники — от структуры услуг и страниц специалистов до документов и понятного пути пациента к записи.'
              )}
            </p>
            <p className="dari-page__meta">
              UX / STRUCTURE / COPY / DESIGN / DEVELOPMENT / LEGAL
            </p>
            <CtaButton to="/" arrow={false}>
              ← На главную
            </CtaButton>
          </div>
          <div className="dari-page__visual">
            <img
              className="dari-page__screenshot"
              src={`${BASE}dari-hero.webp`}
              alt={ruTypo('Сайт DARI — главная страница')}
              width="1920"
              height="1080"
            />
          </div>
        </div>
      </div>

      <div className="dari-before">
        <div className="dari-before__inner">
          <div className="dari-before__text">
            <p className="dari-before__eyebrow">НА СТАРТЕ</p>
            <h2 className="dari-before__title">
              {ruTypo('Информация была. Не хватало единой логики.')}
            </h2>
            <p className="dari-before__desc">
              {ruTypo(
                'У клиники уже был сайт с информацией об услугах, специалистах и способах записи. Задача была шире визуального обновления: нужно было пересобрать структуру и связать ключевые разделы в один понятный сценарий для пациента.'
              )}
            </p>
            <div className="dari-before__theses">
              <div className="dari-before__thesis">
                <p className="dari-before__thesis-label">
                  <span className="dari-before__thesis-num">01</span> / СТРУКТУРА
                </p>
                <p className="dari-before__thesis-text">
                  Важная информация находилась в разных разделах.
                </p>
              </div>
              <div className="dari-before__thesis">
                <p className="dari-before__thesis-label">
                  <span className="dari-before__thesis-num">02</span> / ПУТЬ ПАЦИЕНТА
                </p>
                <p className="dari-before__thesis-text">
                  Нужно было связать запрос, услугу, специалиста, цену и запись.
                </p>
              </div>
              <div className="dari-before__thesis">
                <p className="dari-before__thesis-label">
                  <span className="dari-before__thesis-num">03</span> / СИСТЕМА
                </p>
                <p className="dari-before__thesis-text">
                  Сайт должен был работать не как набор страниц, а как единая точка для пациента.
                </p>
              </div>
            </div>
          </div>
          <div className="dari-before__visual">
            <div className="dari-before__main-img">
              <img
                src={`${BASE}dari/old-home.webp`}
                alt={ruTypo('Старая версия сайта DARI — главная страница')}
                width="1440"
                height="900"
              />
            </div>
            <div className="dari-before__side-img">
              <img
                src={`${BASE}dari/old-services.webp`}
                alt={ruTypo('Старая версия сайта DARI — страница услуг')}
                width="1440"
                height="900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dari-logic">
        <div className="dari-logic__header">
          <p className="dari-logic__eyebrow">НОВАЯ ЛОГИКА</p>
          <h2 className="dari-logic__title">
            {ruTypo('Собрали сайт вокруг пути пациента.')}
          </h2>
          <p className="dari-logic__desc">
            {ruTypo(
              'Новая структура связывает ключевые части сайта между собой: человек может перейти от своего запроса к нужному направлению, познакомиться со специалистом, проверить информацию и цену и перейти к записи.'
            )}
          </p>
        </div>

        <div className="dari-logic__flow">
          <div className="dari-logic__step">
            <p className="dari-logic__step-num">01</p>
            <p className="dari-logic__step-label">ЗАПРОС</p>
            <p className="dari-logic__step-text">С чем человек приходит</p>
          </div>
          <div className="dari-logic__arrow" aria-hidden="true">→</div>
          <div className="dari-logic__step">
            <p className="dari-logic__step-num">02</p>
            <p className="dari-logic__step-label">НАПРАВЛЕНИЕ</p>
            <p className="dari-logic__step-text">Какая услуга подходит</p>
          </div>
          <div className="dari-logic__arrow" aria-hidden="true">→</div>
          <div className="dari-logic__step">
            <p className="dari-logic__step-num">03</p>
            <p className="dari-logic__step-label">СПЕЦИАЛИСТ</p>
            <p className="dari-logic__step-text">К кому можно обратиться</p>
          </div>
          <div className="dari-logic__arrow" aria-hidden="true">→</div>
          <div className="dari-logic__step">
            <p className="dari-logic__step-num">04</p>
            <p className="dari-logic__step-label">ИНФОРМАЦИЯ И ЦЕНА</p>
            <p className="dari-logic__step-text">Что важно знать до записи</p>
          </div>
          <div className="dari-logic__arrow" aria-hidden="true">→</div>
          <div className="dari-logic__step">
            <p className="dari-logic__step-num">05</p>
            <p className="dari-logic__step-label">ЗАПИСЬ</p>
            <p className="dari-logic__step-text">Понятный следующий шаг</p>
          </div>
        </div>
      </div>

      <div className="dari-services">
        <div className="dari-services__inner">
          <div className="dari-services__text">
            <p className="dari-services__eyebrow">УСЛУГИ И НАПРАВЛЕНИЯ</p>
            <h2 className="dari-services__title">
              {ruTypo('Сделали услуги понятными и структурированными.')}
            </h2>
            <p className="dari-services__desc">
              {ruTypo(
                'Новая подача услуг помогает быстрее сориентироваться в направлениях клиники: человек видит основные категории, может выбрать подходящий раздел, изучить процедуры и перейти дальше по понятному сценарию.'
              )}
            </p>
            <div className="dari-services__theses">
              <div className="dari-services__thesis">
                <p className="dari-services__thesis-label">
                  <span className="dari-services__thesis-num">01</span> / НАПРАВЛЕНИЯ
                </p>
                <p className="dari-services__thesis-text">
                  Услуги собраны в понятные тематические категории.
                </p>
              </div>
              <div className="dari-services__thesis">
                <p className="dari-services__thesis-label">
                  <span className="dari-services__thesis-num">02</span> / ВЫБОР
                </p>
                <p className="dari-services__thesis-text">
                  Человеку проще быстро понять, что относится к его запросу.
                </p>
              </div>
              <div className="dari-services__thesis">
                <p className="dari-services__thesis-label">
                  <span className="dari-services__thesis-num">03</span> / ПЕРЕХОД
                </p>
                <p className="dari-services__thesis-text">
                  Из раздела услуг можно логично двигаться дальше — к информации, специалисту и записи.
                </p>
              </div>
            </div>
          </div>
          <div className="dari-services__visual">
            <div className="dari-services__main-img">
              <img
                src={`${BASE}dari/services-overview.webp`}
                alt={ruTypo('Страница услуг DARI — общий вид')}
                width="1440"
                height="900"
              />
            </div>
            <div className="dari-services__side-img">
              <img
                src={`${BASE}dari/services-grid.webp`}
                alt={ruTypo('Сетка услуг DARI — категории')}
                width="1440"
                height="900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dari-specialists">
        <div className="dari-specialists__inner">
          <div className="dari-specialists__text">
            <p className="dari-specialists__eyebrow">СПЕЦИАЛИСТЫ</p>
            <h2 className="dari-specialists__title">
              {ruTypo('У каждого специалиста — своя страница и путь к записи.')}
            </h2>
            <p className="dari-specialists__desc">
              {ruTypo(
                'Карточки помогают быстро познакомиться с командой клиники, а отдельные страницы специалистов дают больше контекста: специализация, опыт, направления работы и понятный переход к записи.'
              )}
            </p>
            <div className="dari-specialists__theses">
              <div className="dari-specialists__thesis">
                <p className="dari-specialists__thesis-label">
                  <span className="dari-specialists__thesis-num">01</span> / КОМАНДА
                </p>
                <p className="dari-specialists__thesis-text">
                  Специалисты собраны в единую систему карточек.
                </p>
              </div>
              <div className="dari-specialists__thesis">
                <p className="dari-specialists__thesis-label">
                  <span className="dari-specialists__thesis-num">02</span> / ЭКСПЕРТНОСТЬ
                </p>
                <p className="dari-specialists__thesis-text">
                  На отдельной странице можно подробнее познакомиться с врачом и его направлением работы.
                </p>
              </div>
              <div className="dari-specialists__thesis">
                <p className="dari-specialists__thesis-label">
                  <span className="dari-specialists__thesis-num">03</span> / ЗАПИСЬ
                </p>
                <p className="dari-specialists__thesis-text">
                  После знакомства со специалистом человек получает понятный следующий шаг.
                </p>
              </div>
            </div>
          </div>
          <div className="dari-specialists__visual">
            <div className="dari-specialists__main-img">
              <img
                src={`${BASE}dari/specialists-grid.webp`}
                alt={ruTypo('Список специалистов DARI — сетка карточек')}
                width="1440"
                height="900"
              />
            </div>
            <div className="dari-specialists__side-img">
              <img
                src={`${BASE}dari/specialist-page.webp`}
                alt={ruTypo('Страница специалиста DARI')}
                width="1440"
                height="900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dari-clinic">
        <div className="dari-clinic__inner">
          <div className="dari-clinic__text">
            <p className="dari-clinic__eyebrow">КЛИНИКА</p>
            <h2 className="dari-clinic__title">
              {ruTypo('Реальное пространство стало частью визуальной системы сайта.')}
            </h2>
            <p className="dari-clinic__desc">
              {ruTypo(
                'Вместо обезличенного визуала в сайт встроили реальные фотографии клиники. Так человек ещё до визита может увидеть пространство, кабинеты и атмосферу места.'
              )}
            </p>
            <div className="dari-clinic__theses">
              <div className="dari-clinic__thesis">
                <p className="dari-clinic__thesis-label">
                  <span className="dari-clinic__thesis-num">01</span> / РЕАЛЬНОЕ ПРОСТРАНСТВО
                </p>
                <p className="dari-clinic__thesis-text">
                  В основе визуала — настоящие интерьеры клиники.
                </p>
              </div>
              <div className="dari-clinic__thesis">
                <p className="dari-clinic__thesis-label">
                  <span className="dari-clinic__thesis-num">02</span> / ДОВЕРИЕ
                </p>
                <p className="dari-clinic__thesis-text">
                  Фотографии помогают заранее понять, куда человек придёт.
                </p>
              </div>
              <div className="dari-clinic__thesis">
                <p className="dari-clinic__thesis-label">
                  <span className="dari-clinic__thesis-num">03</span> / ЦЕЛОСТНОСТЬ
                </p>
                <p className="dari-clinic__thesis-text">
                  Интерьеры встроены в общую визуальную систему сайта, а не существуют отдельно от неё.
                </p>
              </div>
            </div>
          </div>
          <div className="dari-clinic__visual">
            <div className="dari-clinic__main-img">
              <img
                src={`${BASE}dari/clinic-gallery.webp`}
                alt={ruTypo('Галерея клиники DARI — общий вид пространства')}
                width="1440"
                height="900"
              />
            </div>
            <div className="dari-clinic__side">
              <div className="dari-clinic__side-item">
                <img
                  src={`${BASE}dari/clinic-room-01.webp`}
                  alt={ruTypo('Кабинет клиники DARI')}
                  width="720"
                  height="480"
                />
              </div>
              <div className="dari-clinic__side-item">
                <img
                  src={`${BASE}dari/clinic-room-02.webp`}
                  alt={ruTypo('Процедурный кабинет DARI')}
                  width="720"
                  height="480"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dari-supplements">
        <div className="dari-supplements__inner">
          <div className="dari-supplements__text">
            <p className="dari-supplements__eyebrow">БАДЫ И НУТРИЦЕВТИКИ</p>
            <h2 className="dari-supplements__title">
              {ruTypo('Выделили отдельное направление с продуктами и рекомендациями.')}
            </h2>
            <p className="dari-supplements__desc">
              {ruTypo(
                'Для продукции, которую рекомендуют специалисты клиники, создали отдельный раздел сайта. Пользователь может посмотреть бренды, карточки товаров, состав, рекомендации по применению, цену и способ уточнить наличие.'
              )}
            </p>
          </div>
          <div className="dari-supplements__visual">
            <div className="dari-supplements__main-img">
              <img
                src={`${BASE}dari/supplements-grid.webp`}
                alt={ruTypo('Каталог БАДов DARI — обзор категории')}
                width="1440"
                height="900"
              />
            </div>
            <div className="dari-supplements__side-img">
              <img
                src={`${BASE}dari/supplement-detail.webp`}
                alt={ruTypo('Карточка товара DARI — подробная информация')}
                width="1440"
                height="900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dari-legal">
        <div className="dari-legal__top">
          <div className="dari-legal__intro">
            <p className="dari-legal__eyebrow">ЮРИДИЧЕСКАЯ ЧАСТЬ</p>
            <h2 className="dari-legal__title">
              {ruTypo('Юридические требования стали частью структуры сайта.')}
            </h2>
          </div>
          <p className="dari-legal__desc">
            {ruTypo(
              'В структуру сайта включили обязательные сведения о клинике и лицензии, документы для пациента и политику обработки персональных данных. После основной разработки проект дополнительно проверялся по материалам юридического анализа клиента, а замечания учитывались в доработке.'
            )}
          </p>
        </div>
        <div className="dari-legal__docs">
          <figure className="dari-legal__doc">
            <div className="dari-legal__doc-frame">
              <img
                src={`${BASE}dari/privacy-policy.webp`}
                alt={ruTypo('Политика обработки персональных данных DARI')}
                width="1440"
                height="900"
              />
            </div>
            <figcaption className="dari-legal__caption">
              <p className="dari-legal__caption-label">ПЕРСОНАЛЬНЫЕ ДАННЫЕ</p>
              <p className="dari-legal__caption-text">
                Политика обработки персональных данных
              </p>
            </figcaption>
          </figure>
          <figure className="dari-legal__doc">
            <div className="dari-legal__doc-frame">
              <img
                src={`${BASE}dari/paid-services-rules.webp`}
                alt={ruTypo('Правила предоставления платных медицинских услуг DARI')}
                width="1440"
                height="900"
              />
            </div>
            <figcaption className="dari-legal__caption">
              <p className="dari-legal__caption-label">ДОКУМЕНТЫ ДЛЯ ПАЦИЕНТА</p>
              <p className="dari-legal__caption-text">
                Правила предоставления платных медицинских услуг
              </p>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="dari-responsive">
        <div className="dari-responsive__inner">
          <div className="dari-responsive__left">
            <div className="dari-responsive__text">
              <p className="dari-responsive__eyebrow">АДАПТИВНОСТЬ</p>
              <h2 className="dari-responsive__title">
                {ruTypo('Сайт работает как единая система и на большом экране, и в телефоне.')}
              </h2>
              <p className="dari-responsive__desc">
                {ruTypo(
                  'Мобильную версию собирали не как уменьшенную копию desktop. На небольшом экране сохранили понятную последовательность контента, читаемые тексты, карточки услуг, навигацию и заметные действия для записи.'
                )}
              </p>
            </div>
            <div className="dari-responsive__mockup">
              <img
                src={`${BASE}dari/responsive-mockup.webp`}
                alt={ruTypo('Адаптивная вёрстка DARI — desktop и мобильный вид')}
                width="1440"
                height="900"
              />
            </div>
          </div>
          <div className="dari-responsive__visual">
            <div className="dari-responsive__shot">
              <div className="dari-responsive__shot-frame">
                <img
                  src={`${BASE}dari/mobile-home.webp`}
                  alt={ruTypo('Мобильная версия DARI — главная страница')}
                  width="380"
                  height="820"
                />
              </div>
            </div>
            <div className="dari-responsive__shot">
              <div className="dari-responsive__shot-frame">
                <img
                  src={`${BASE}dari/mobile-services.webp`}
                  alt={ruTypo('Мобильная версия DARI — страница услуг')}
                  width="380"
                  height="820"
                />
              </div>
            </div>
            <div className="dari-responsive__shot">
              <div className="dari-responsive__shot-frame">
                <img
                  src={`${BASE}dari/mobile-specialists.webp`}
                  alt={ruTypo('Мобильная версия DARI — страница специалистов')}
                  width="380"
                  height="820"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dari-result">
        <div className="dari-result__inner">
          <p className="dari-result__eyebrow">РЕЗУЛЬТАТ</p>
          <h2 className="dari-result__title">
            {ruTypo(
              'Разрозненная информация превратилась в единую систему для пациента.'
            )}
          </h2>
          <p className="dari-result__desc">
            {ruTypo(
              'Теперь на сайте понятно, чем занимается клиника, какие направления доступны, кто из специалистов ведёт приём и как записаться. При этом структура учитывает мобильный сценарий и юридические требования медицинского сайта.'
            )}
          </p>
          <div className="dari-result__list">
            <div className="dari-result__item">
              <p className="dari-result__num">01</p>
              <h3 className="dari-result__item-title">Понятный путь</h3>
              <p className="dari-result__item-text">
                {ruTypo(
                  'От первого знакомства с клиникой до выбора услуги, специалиста и записи.'
                )}
              </p>
            </div>
            <div className="dari-result__item">
              <p className="dari-result__num">02</p>
              <h3 className="dari-result__item-title">Единая структура</h3>
              <p className="dari-result__item-text">
                {ruTypo(
                  'Услуги, специалисты, клиника и дополнительные направления собраны в одной логике.'
                )}
              </p>
            </div>
            <div className="dari-result__item">
              <p className="dari-result__num">03</p>
              <h3 className="dari-result__item-title">Система, а не витрина</h3>
              <p className="dari-result__item-text">
                {ruTypo(
                  'Сайт работает как цельный инструмент: на разных устройствах и с учётом юридических требований.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="dari-review">
        <div className="dari-review__inner">
          <div className="dari-review__text">
            <p className="dari-review__eyebrow">ОТЗЫВ</p>
            <blockquote className="dari-review__quote">
              {ruTypo(
                '«Сайт просто 💥, уже получили комплименты, а самое главное — он выполнен по всем требованиям нашего законодательства».'
              )}
            </blockquote>
            <p className="dari-review__sub">
              {ruTypo('«Нам уже несколько человек сказали, что классный сайт у нас))»')}
            </p>
            <p className="dari-review__author">Дари</p>
          </div>
          <div className="dari-review__visual">
            <img
              className="dari-review__img"
              src={`${BASE}dari/review-dari.webp`}
              alt={ruTypo('Отзыв клиента DARI — скриншот переписки')}
            />
          </div>
        </div>
      </div>
    </section>
    <ContactSection />
    <Footer />
  </>
  )
}
