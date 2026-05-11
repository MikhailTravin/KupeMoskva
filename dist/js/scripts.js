const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

//Маска
const telephone = document.querySelectorAll('.telephone');
if (telephone) {
  Inputmask({
    "mask": "+7 (999) 999 - 99 - 99",
    "showMaskOnHover": false,
  }).mask(telephone);
}

const size = document.querySelectorAll('.size');
if (size) {
  Inputmask({
    "mask": "999x99x99",
    "showMaskOnHover": false,
  }).mask(size);
}



//========================================================================================================================================================

const filterButtons = document.querySelectorAll('.block-reviews__navigation .block-reviews__title');
if (filterButtons.length) {
  const slides = document.querySelectorAll('.block-reviews__slide');
  const swiperContainer = document.querySelector('.block-reviews__slider');
  let swiperReviews = null;

  if (swiperContainer) {
    swiperReviews = new Swiper('.block-reviews__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 15,
      speed: 400,
      navigation: {
        prevEl: '.block-reviews__arrow-prev',
        nextEl: '.block-reviews__arrow-next',
      },
      breakpoints: {
        480: {
          slidesPerView: 'auto',
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 'auto',
          spaceBetween: 30,
        },
      },
    });
  }

  function setActiveButton(activeFilter) {
    filterButtons.forEach(button => {
      const filterValue = button.getAttribute('data-filter');
      if (filterValue === activeFilter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  function filterSlides(filterValue) {
    slides.forEach(slide => {
      const slideFilter = slide.getAttribute('data-filter');

      if (filterValue === 'all' || slideFilter === filterValue) {
        slide.style.display = 'flex';
        slide.classList.remove('swiper-slide-hidden');
      } else {
        slide.style.display = 'none';
        slide.classList.add('swiper-slide-hidden');
      }
    });

    if (swiperReviews) {
      setTimeout(() => {
        swiperReviews.update();
        swiperReviews.updateSlides();
        swiperReviews.updateSize();
        swiperReviews.updateProgress();

        if (swiperReviews.navigation) {
          swiperReviews.navigation.update();
        }
      }, 50);
    }
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const filterValue = this.getAttribute('data-filter');

      if (filterValue) {
        setActiveButton(filterValue);
        filterSlides(filterValue);
      }
    });
  });
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
      speed: 150,
      editable: false
    }
    this.config = Object.assign(defaultConfig, props);
    this.selectClasses = {
      classSelect: "select",
      classSelectBody: "select__body",
      classSelectTitle: "select__title",
      classSelectValue: "select__value",
      classSelectLabel: "select__label",
      classSelectInput: "select__input",
      classSelectText: "select__text",
      classSelectLink: "select__link",
      classSelectOptions: "select__options",
      classSelectOptionsScroll: "select__scroll",
      classSelectOption: "select__option",
      classSelectContent: "select__content",
      classSelectRow: "select__row",
      classSelectData: "select__asset",
      classSelectArrow: "select__arrow",
      classSelectIcon: "select__icon",
      classSelectDisabled: "_select-disabled",
      classSelectTag: "_select-tag",
      classSelectOpen: "_select-open",
      classSelectActive: "_select-active",
      classSelectFocus: "_select-focus",
      classSelectMultiple: "_select-multiple",
      classSelectCheckBox: "_select-checkbox",
      classSelectOptionSelected: "_select-selected",
      classSelectPseudoLabel: "_select-pseudo-label",
      classSelectEditable: "_select-editable",
      classSelectTelephone: "telephone",
    }
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }
  getSelectClass(className) {
    return `.${className}`;
  }
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    }
  }
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    document.addEventListener('click', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('submit', function (e) {
      const form = e.target;

      if (!form.hasAttribute('data-ajax')) return;

      const customSelects = form.querySelectorAll('.select');

      customSelects.forEach(selectItem => {
        const originalSelect = selectItem.querySelector('select');
        if (!originalSelect) return;

        const selectedOption = originalSelect.options[originalSelect.selectedIndex];

        if (selectedOption && !selectedOption.dataset.custom) {
          originalSelect.dataset.currentMethod = selectedOption.dataset.value || selectedOption.value;
        }
      });
    });
  }
  selectInit(originalSelect, index) {
    const _this = this;
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.appendChild(originalSelect);
    originalSelect.hidden = true;
    index ? originalSelect.dataset.id = index : null;

    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);

    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
    }

    if (originalSelect.hasAttribute('data-editable') || true) {
      this.config.editable = true;
      selectItem.classList.add(this.selectClasses.classSelectEditable);
    }

    this.selectBuild(originalSelect);

    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
    this.config.speed = +originalSelect.dataset.speed;

    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;

    selectItem.dataset.id = originalSelect.dataset.id;
    originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;

    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);

    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);

    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;

    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;

    this.selectDisabled(selectItem, originalSelect);
  }
  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {

            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            if (!this.config.editable || !targetElement.closest(`.${this.selectClasses.classSelectContent}`)) {
              this.selectAction(selectItem);
            }
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }
  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectСlose(selectActiveItem);
      });
    }
  }
  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
      setTimeout(() => {
        selectItem.style.zIndex = '';
      }, originalSelect.dataset.speed);
    }
  }
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;

    this.setOptionsPosition(selectItem);

    this.selectsСlose();

    setTimeout(() => {
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);

        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = '';
          }, originalSelect.dataset.speed);
        }
      }
    }, 0);
  }
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));

    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;

    if (this.config.editable && !originalSelect.multiple) {
      this.setupEditableContent(selectItem, originalSelect);
    }
  }
  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    const selectedOptions = this.getSelectedOptionsData(originalSelect);

    let selectedIcon = '';
    let isTelephone = false;
    if (selectedOptions.elements.length > 0 && selectedOptions.elements[0]) {
      selectedIcon = this.getOptionIcon(selectedOptions.elements[0]);
      isTelephone = selectedOptions.elements[0].dataset.icon === 'svg-phone';
    }

    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = selectedOptions.elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="${this.selectClasses.classSelectTag}">${this.getSelectElementContent(option)}</span>`).join('');

      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }

    let placeholderText = '';

    if (selectedOptions.elements.length > 0 && selectedOptions.elements[0]) {
      placeholderText = selectedOptions.elements[0].textContent.trim();
    } else {
      placeholderText = originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '';
    }

    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }

    selectedOptions.values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);

    const arrowHtml = this.getArrowWithIcon(originalSelect, selectedIcon);

    if (originalSelect.hasAttribute('data-search')) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${this.escapeHtml(placeholderText)}" data-placeholder="${this.escapeHtml(placeholderText)}" class="${this.selectClasses.classSelectInput}">${arrowHtml}</span></div>`;
    } else {
      const customClass = selectedOptions.elements.length && selectedOptions.elements[0] && selectedOptions.elements[0].dataset.class ? ` ${selectedOptions.elements[0].dataset.class}` : '';
      const telephoneClass = isTelephone ? ` ${this.selectClasses.classSelectTelephone}` : '';

      if (this.config.editable && !originalSelect.multiple) {
        return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}">
          <input type="text" class="${this.selectClasses.classSelectContent}${customClass}${telephoneClass}" value="" placeholder="${this.escapeHtml(placeholderText)}">
          ${arrowHtml}
        </span></div>`;
      } else {
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${this.escapeHtml(String(selectTitleValue))}</span>${arrowHtml}</span></button>`;
      }
    }
  }
  escapeHtml(str) {
    if (str === undefined || str === null) return '';
    const stringValue = String(str);
    return stringValue.replace(/[&<>]/g, function (m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }
  getOptionIcon(selectOption) {
    const iconData = selectOption.dataset.icon;
    if (!iconData) return '';

    if (iconData === 'svg-phone') {
      return `<svg aria-hidden="true" width="12" height="12">
                <use xlink:href="img/sprite.svg#phone"></use>
              </svg>`;
    }

    if (iconData.endsWith('.svg') || iconData.includes('img/')) {
      return `<img src="${iconData}" alt="" width="16" height="16">`;
    }

    return iconData;
  }
  getArrowWithIcon(originalSelect, selectedIcon) {
    let iconHtml = selectedIcon;
    if (!iconHtml && originalSelect.dataset.selectedIcon) {
      iconHtml = originalSelect.dataset.selectedIcon;
    }

    if (iconHtml) {
      return `<span class="${this.selectClasses.classSelectArrow}"><span class="${this.selectClasses.classSelectIcon}">${iconHtml}</span></span>`;
    }

    return `<span class="${this.selectClasses.classSelectArrow}"></span>`;
  }
  setupEditableContent(selectItem, originalSelect) {
    const contentInput = selectItem.querySelector(`.${this.selectClasses.classSelectContent}`);
    if (!contentInput) return;

    const _this = this;
    let isUpdating = false;

    let currentMethod = null;
    const initialSelectedOption = originalSelect.options[originalSelect.selectedIndex];
    if (initialSelectedOption && initialSelectedOption.value && !initialSelectedOption.dataset.custom) {
      currentMethod = initialSelectedOption.dataset.value || initialSelectedOption.value;
      originalSelect.dataset.currentMethod = currentMethod;
    }

    const removeCustomOption = () => {
      const customOption = originalSelect.querySelector('option[data-custom="true"]');
      if (customOption) {
        customOption.remove();
      }
    };

    contentInput.addEventListener('input', function (e) {
      if (isUpdating) return;
      isUpdating = true;

      const newValue = this.value;
      originalSelect.dataset.userInput = newValue;

      if (!newValue.trim()) {
        originalSelect.selectedIndex = -1;
        removeCustomOption();

        Array.from(originalSelect.options).forEach(option => {
          if (option.dataset.originalValue) {
            option.value = option.dataset.originalValue;
            delete option.dataset.originalValue;
          }
        });

        selectItem.classList.remove(_this.selectClasses.classSelectActive);
      } else {
        const matchedOption = _this.findOptionByText(originalSelect, newValue);

        if (matchedOption) {
          removeCustomOption();

          Array.from(originalSelect.options).forEach(option => {
            if (option.dataset.originalValue) {
              option.value = option.dataset.originalValue;
              delete option.dataset.originalValue;
            }
          });

          matchedOption.selected = true;
          selectItem.classList.add(_this.selectClasses.classSelectActive);
        } else {
          Array.from(originalSelect.options).forEach(option => {
            if (!option.dataset.custom && !option.dataset.originalValue) {
              option.dataset.originalValue = option.value;
            }
          });

          Array.from(originalSelect.options).forEach(option => {
            option.selected = false;
          });

          let customOption = originalSelect.querySelector('option[data-custom="true"]');
          if (!customOption) {
            customOption = document.createElement('option');
            customOption.dataset.custom = 'true';
            originalSelect.appendChild(customOption);
          }

          customOption.value = newValue;
          customOption.textContent = newValue;
          customOption.selected = true;

          selectItem.classList.add(_this.selectClasses.classSelectActive);
        }
      }

      isUpdating = false;
    });

    selectItem.addEventListener('click', function (e) {
      const optionButton = e.target.closest(`.${_this.selectClasses.classSelectOption}`);
      if (optionButton && !optionButton.hidden) {
        const method = optionButton.dataset.value;
        if (method) {
          originalSelect.dataset.currentMethod = method;
        }
      }
    });

    contentInput.addEventListener('blur', function () {
      if (selectItem.classList.contains(_this.selectClasses.classSelectOpen)) {
        _this.selectAction(selectItem);
      }
    });

    contentInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        this.blur();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!selectItem.classList.contains(_this.selectClasses.classSelectOpen)) {
          _this.selectAction(selectItem);
        }
        e.preventDefault();
      } else if (e.key === 'Escape') {
        if (selectItem.classList.contains(_this.selectClasses.classSelectOpen)) {
          _this.selectAction(selectItem);
        }
      }
    });

    const updateInputValue = function () {
      if (!isUpdating) {
        const selectedOptions = _this.getSelectedOptionsData(originalSelect);

        if (selectedOptions.elements.length > 0 && selectedOptions.elements[0]) {
          const option = selectedOptions.elements[0];

          if (option.dataset.custom === 'true') {
            contentInput.value = option.value;
            contentInput.placeholder = originalSelect.dataset.placeholder || 'Введите значение';
          } else if (originalSelect.dataset.userInput) {
            contentInput.value = originalSelect.dataset.userInput;
          } else {
            contentInput.value = '';
          }

          if (!option.dataset.custom) {
            contentInput.placeholder = option.textContent.trim();
          }
        } else if (originalSelect.dataset.userInput) {
          contentInput.value = originalSelect.dataset.userInput;
          contentInput.placeholder = originalSelect.dataset.placeholder || '';
        } else {
          contentInput.value = '';
          contentInput.placeholder = originalSelect.dataset.placeholder || '';
        }
      }
    };

    originalSelect.addEventListener('change', updateInputValue);
    updateInputValue();
  }
  findOptionByText(originalSelect, text) {
    return Array.from(originalSelect.options).find(option =>
      option.textContent.trim().toLowerCase() === text.trim().toLowerCase()
    );
  }
  getSelectElementContent(selectOption) {
    const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
    const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      }
    }
  }

  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      if (originalSelect.selectedIndex >= 0 && originalSelect.options[originalSelect.selectedIndex]) {
        const option = originalSelect.options[originalSelect.selectedIndex];
        if (option.value) {
          selectedOptions.push(option);
        }
      }
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option && option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    }
  }
  getOptions(originalSelect) {
    const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
    const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;

      selectOptions = selectOptions.filter(option => option.value);

      selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
      selectOptions.forEach(selectOption => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += `</div>`;
      return selectOptionsHTML;
    }
  }
  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';

    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple && selectOption.value ? `hidden` : ``;

    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';

    let iconHtml = '';
    if (selectOption.dataset.icon) {
      iconHtml = this.getOptionIcon(selectOption);
    }

    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    if (iconHtml) {
      selectOptionHTML += `<span class="select__option-icon">${iconHtml}</span>`;
    }
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
    const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
    const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
      const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
      const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
      selectOptions.hidden = true;

      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

      if (selectItemResult < 0) {
        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
        if (newMaxHeightValue < 100) {
          selectItem.classList.add('select--show-top');
          selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
        } else {
          selectItem.classList.remove('select--show-top');
          selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
        }
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove('select--show-top');
        selectItemScroll.style.maxHeight = customMaxHeightValue;
      }, +originalSelect.dataset.speed);
    }
  }
  optionAction(selectItem, originalSelect, optionItem) {
    const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
    if (!selectOptions.classList.contains('_slide')) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
          originalSelectSelectedItem.removeAttribute('selected');
        });
        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
        selectSelectedItems.forEach(selectSelectedItems => {
          originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
        });
      } else {
        if (optionItem.dataset.value) {
          const customOption = originalSelect.querySelector('option[data-custom="true"]');
          if (customOption) {
            customOption.remove();
          }

          Array.from(originalSelect.options).forEach(option => {
            if (option.dataset.originalValue) {
              option.value = option.dataset.originalValue;
              delete option.dataset.originalValue;
            }
          });

          if (!originalSelect.hasAttribute('data-show-selected')) {
            setTimeout(() => {
              if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
                selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
              }
              optionItem.hidden = true;
            }, this.config.speed);
          }
          originalSelect.value = optionItem.dataset.value;
          delete originalSelect.dataset.userInput;

          const contentInput = selectItem.querySelector(`.${this.selectClasses.classSelectContent}`);
          if (contentInput) {
            contentInput.value = '';
            contentInput.placeholder = optionItem.textContent.trim();
          }

          this.selectAction(selectItem);
        }
      }
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
  }
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute('data-validate')) {
      if (window.formValidate) {
        window.formValidate.validateInput(originalSelect);
      }
    }

    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      const form = originalSelect.closest('form');
      if (form) {
        form.appendChild(tempButton);
        tempButton.click();
        tempButton.remove();
      }
    }
    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      const titleElement = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (titleElement) titleElement.disabled = true;
      const contentInput = selectItem.querySelector(`.${this.selectClasses.classSelectContent}`);
      if (contentInput) contentInput.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      const titleElement = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (titleElement) titleElement.disabled = false;
      const contentInput = selectItem.querySelector(`.${this.selectClasses.classSelectContent}`);
      if (contentInput) contentInput.disabled = false;
    }
  }
  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
    const _this = this;
    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }
  selectCallback(selectItem, originalSelect) {
    const telephoneInput = selectItem.querySelector('.telephone');
    if (telephoneInput && window.Inputmask) {
      Inputmask({
        "mask": "+7 (999) 999 - 99 - 99",
        "showMaskOnHover": false,
      }).mask(telephoneInput);
    }

    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    window.modules_flsModules = window.modules_flsModules || {};
    modules_flsModules.select = new SelectConstructor({});
  });
} else {
  window.modules_flsModules = window.modules_flsModules || {};
  modules_flsModules.select = new SelectConstructor({});
}

//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
    }
  });
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');

        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight))
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});

let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;

    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;

      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }

    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');

        el.classList.remove('_form-success');
        el.parentElement.classList.remove('_form-success');

        el.parentElement.classList.remove('filled');

        formValidate.removeError(el);

        if (el.classList.contains('telephone') && el.clearFilled) {
          el.clearFilled();
        }
      }

      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
          checkbox.classList.remove('_form-success');
          checkbox.closest('.checkbox')?.classList.remove('_form-success');
        }
      }

      if (modules_flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            modules_flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};

function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }

  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;

    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();

        const customSelects = form.querySelectorAll('.select');

        customSelects.forEach(selectItem => {
          const originalSelect = selectItem.querySelector('select');
          if (!originalSelect) return;

          let contactMethod = 'Не выбран';
          let contactValue = 'Не указан';

          const selectedOption = originalSelect.options[originalSelect.selectedIndex];

          if (selectedOption && selectedOption.value) {
            if (selectedOption.dataset.custom === 'true') {
              contactMethod = originalSelect.dataset.currentMethod || 'Не выбран';
              contactValue = originalSelect.dataset.userInput || selectedOption.value;
            } else {
              contactMethod = selectedOption.dataset.value || selectedOption.value;
              contactValue = selectedOption.value;
              originalSelect.dataset.currentMethod = contactMethod;
            }
          }

          const oldMethodInput = form.querySelector('input[name="contact_method"]');
          const oldValueInput = form.querySelector('input[name="user_contact_value"]');
          if (oldMethodInput) oldMethodInput.remove();
          if (oldValueInput) oldValueInput.remove();

          const methodInput = document.createElement('input');
          methodInput.type = 'hidden';
          methodInput.name = 'contact_method';
          methodInput.value = contactMethod;
          form.appendChild(methodInput);

          const valueInput = document.createElement('input');
          valueInput.type = 'hidden';
          valueInput.name = 'user_contact_value';
          valueInput.value = contactValue;
          form.appendChild(valueInput);

        });

        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');

        try {
          const response = await fetch(formAction, {
            method: formMethod,
            body: formData
          });

          if (response.ok) {
            let responseResult = await response.json();
            form.classList.remove('_sending');

            if (responseResult.success) {
              formSent(form, responseResult);

              setTimeout(() => {
                form.reset();
                const allSelects = form.querySelectorAll('select');
                allSelects.forEach(select => {
                  delete select.dataset.userInput;
                  delete select.dataset.currentMethod;
                  const customOpt = select.querySelector('option[data-custom="true"]');
                  if (customOpt) customOpt.remove();
                  Array.from(select.options).forEach(option => {
                    if (option.dataset.originalValue) {
                      option.value = option.dataset.originalValue;
                      delete option.dataset.originalValue;
                    }
                  });
                  select.selectedIndex = 0;
                });
              }, 500);

            } else {
              alert("Ошибка: " + (responseResult.message || "Неизвестная ошибка"));
              console.error("Ответ сервера:", responseResult);
            }
          } else {
            alert("Ошибка сервера");
            form.classList.remove('_sending');
          }
        } catch (error) {
          console.error('Ошибка отправки формы:', error);
          alert("Ошибка отправки формы");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }

  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));

    const telephoneInputs = form.querySelectorAll('.telephone');
    telephoneInputs.forEach(input => {
      input.value = '';
      const parent = input.closest('.form__input');
      if (parent) {
        parent.classList.remove('filled');
      }
    });

    const customSelects = form.querySelectorAll('.select');
    customSelects.forEach(selectItem => {
      const originalSelect = selectItem.querySelector('select');
      if (originalSelect) {
        const customOption = originalSelect.querySelector('option[data-custom="true"]');
        if (customOption) {
          customOption.remove();
        }

        Array.from(originalSelect.options).forEach(option => {
          if (option.dataset.originalValue) {
            option.value = option.dataset.originalValue;
            delete option.dataset.originalValue;
          }
        });

        originalSelect.selectedIndex = 0;

        delete originalSelect.dataset.userInput;
        delete originalSelect.dataset.currentMethod;

        const contentInput = selectItem.querySelector('.select__content');
        if (contentInput) {
          contentInput.value = '';
          const placeholder = originalSelect.dataset.placeholder || '';
          contentInput.placeholder = placeholder;
        }

        selectItem.classList.remove('_select-active');

        const optionButtons = selectItem.querySelectorAll('.select__option');
        optionButtons.forEach(btn => {
          btn.hidden = false;
        });

        if (!originalSelect.hasAttribute('data-show-selected')) {
          const firstOption = selectItem.querySelector('.select__option[data-value]');
          if (firstOption && originalSelect.selectedIndex === 0) {
            firstOption.hidden = true;
          }
        }

        if (typeof SelectConstructor !== 'undefined') {
          const selectInstance = new SelectConstructor({ init: false });
          selectInstance.setSelectTitleValue(selectItem, originalSelect);
        }
      }
    });

    const hiddenInputs = form.querySelectorAll('input[type="hidden"]');
    hiddenInputs.forEach(input => {
      if (input.name === 'button_subject' ||
        input.name === 'contact_method' ||
        input.name === 'user_contact_value') {
        input.value = '';
      }
    });

    if (typeof formValidate !== 'undefined' && formValidate.formClean) {
      formValidate.formClean(form);
    }

    const popupSelector = form.dataset.popupMessage;

    if (popupSelector) {
      const targetPopup = document.querySelector(popupSelector);

      if (!targetPopup) {
        console.error('Целевой попап не найден:', popupSelector);
        return;
      }

      const parentPopup = form.closest('.popup');

      if (parentPopup) {
        parentPopup.classList.remove('popup_show');
        parentPopup.setAttribute('aria-hidden', 'true');

        if (typeof modules_flsModules !== 'undefined' && modules_flsModules.popup) {
          modules_flsModules.popup.isOpen = false;
          modules_flsModules.popup._selectorOpen = false;

          setTimeout(() => {
            modules_flsModules.popup.open(popupSelector);
            setupThanksCloseHandler(targetPopup);
          }, 350);
        } else {
          setTimeout(() => {
            document.querySelectorAll('.popup_show').forEach(p => {
              p.classList.remove('popup_show');
              p.setAttribute('aria-hidden', 'true');
            });

            targetPopup.classList.add('popup_show');
            targetPopup.setAttribute('aria-hidden', 'false');

            if (!document.documentElement.classList.contains('popup-show')) {
              document.documentElement.classList.add('popup-show');

              if (typeof bodyLock === 'function') {
                bodyLock();
              } else {
                document.documentElement.classList.add('lock');
              }
            }

            setupThanksCloseHandler(targetPopup);
          }, 350);
        }
      } else {
        if (typeof modules_flsModules !== 'undefined' && modules_flsModules.popup) {
          if (modules_flsModules.popup.isOpen) {
            modules_flsModules.popup.close();

            setTimeout(() => {
              modules_flsModules.popup._selectorOpen = false;
              modules_flsModules.popup.open(popupSelector);
            }, 350);
          } else {
            modules_flsModules.popup.open(popupSelector);
          }
        } else {
          document.querySelectorAll('.popup_show').forEach(p => {
            p.classList.remove('popup_show');
            p.setAttribute('aria-hidden', 'true');
          });

          targetPopup.classList.add('popup_show');
          targetPopup.setAttribute('aria-hidden', 'false');
          document.documentElement.classList.add('popup-show');

          if (typeof bodyLock === 'function') {
            bodyLock();
          } else {
            document.documentElement.classList.add('lock');
          }
        }

        setupThanksCloseHandler(targetPopup);
      }
    }
  }

  function setupThanksCloseHandler(popup) {
    if (!popup) return;

    const closeButtons = popup.querySelectorAll('[data-close]');
    const wrapper = popup.querySelector('.popup__wrapper');

    closeButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        setTimeout(() => {
          const openPopups = document.querySelectorAll('.popup_show');
          if (openPopups.length === 0 ||
            (openPopups.length === 1 && openPopups[0] === popup && !popup.classList.contains('popup_show'))) {
            document.documentElement.classList.remove('lock', 'popup-show');
            if (typeof bodyLock === 'function') {
              bodyUnlock();
            }
          }
        }, 300);
      });
    });

    if (wrapper) {
      wrapper.addEventListener('click', function (e) {
        if (e.target === wrapper) {
          setTimeout(() => {
            const openPopups = document.querySelectorAll('.popup_show');
            if (openPopups.length === 0) {
              document.documentElement.classList.remove('lock', 'popup-show');
              if (typeof bodyLock === 'function') {
                bodyUnlock();
              }
            }
          }, 300);
        }
      });
    }
  }
}
formSubmit();

//========================================================================================================================================================

const quizSteps = document.querySelector('.block-quiz__steps');

if (quizSteps) {
  const quizSend = document.querySelector('.block-quiz__send');
  const steps = document.querySelectorAll('.block-quiz__step');
  const nextButtons = document.querySelectorAll('.btn-quiz-next');
  const prevButtons = document.querySelectorAll('.btn-quiz-prev');
  const submitButton = document.querySelector('.block-quiz__steps button[type="submit"]');

  let currentStep = 0;

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.style.display = index === stepIndex ? 'block' : 'none';
    });
  }

  function isCurrentStepValid() {
    const currentStepElement = steps[currentStep];

    if (currentStep === 3) {
      return isAtLeastOneFieldFilled(currentStepElement);
    }

    const requiredItems = currentStepElement.querySelectorAll('[data-required]');

    if (requiredItems.length === 0) return true;

    let isValid = true;

    requiredItems.forEach(item => {
      if (item.type === 'radio') {
        const radioGroup = currentStepElement.querySelectorAll(`input[name="${item.name}"]`);
        let isChecked = false;
        radioGroup.forEach(radio => {
          if (radio.checked) isChecked = true;
        });

        if (!isChecked) {
          isValid = false;
          showRadioError(item);
        } else {
          hideRadioError(item);
        }
      }
      else if (item.tagName === 'INPUT' && item.type !== 'radio') {
        if (!item.value.trim()) {
          isValid = false;
          if (!item.classList.contains('_form-error')) {
            item.classList.add('_form-error');
            if (item.parentElement) item.parentElement.classList.add('_form-error');
          }
        } else {
          item.classList.remove('_form-error');
          if (item.parentElement) item.parentElement.classList.remove('_form-error');
        }
      }
    });

    return isValid;
  }

  function isAtLeastOneFieldFilled(stepElement) {
    const inputs = stepElement.querySelectorAll('.form__input input');
    let atLeastOneFilled = false;

    clearContactErrors(stepElement);

    inputs.forEach(input => {
      if (input.value.trim()) {
        atLeastOneFilled = true;
        input.classList.remove('_form-error');
        if (input.parentElement) {
          input.parentElement.classList.remove('_form-error');
        }
      }
    });

    if (!atLeastOneFilled) {
      showContactError(stepElement);
    }

    return atLeastOneFilled;
  }

  function showContactError(stepElement) {
    const formInputs = stepElement.querySelectorAll('.form__input');
    formInputs.forEach(formInput => {
      if (!formInput.classList.contains('_form-error')) {
        formInput.classList.add('_form-error');
      }
    });
  }

  function clearContactErrors(stepElement) {
    const formInputs = stepElement.querySelectorAll('.form__input');
    formInputs.forEach(formInput => {
      formInput.classList.remove('_form-error');
      const input = formInput.querySelector('input');
      if (input) {
        input.classList.remove('_form-error');
      }
    });
  }

  function showRadioError(radioItem) {
    const optionsBlock = radioItem.closest('.options');
    if (optionsBlock && !optionsBlock.parentElement.querySelector('.form__error')) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'form__error';
      errorDiv.textContent = 'Пожалуйста, выберите один из вариантов';
      optionsBlock.style.marginBottom = '0';
      optionsBlock.parentElement.insertBefore(errorDiv, optionsBlock.nextSibling);
    }
  }

  function hideRadioError(radioItem) {
    const optionsBlock = radioItem.closest('.options');
    if (optionsBlock) {
      const errorDiv = optionsBlock.parentElement.querySelector('.form__error');
      if (errorDiv) errorDiv.remove();
    }
  }

  function nextStep() {
    clearErrorsOnCurrentStep();

    if (isCurrentStepValid()) {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
        updateFieldsState();
        const quizBlock = document.querySelector('.block-quiz');
        if (quizBlock) {
          quizBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  function updateFieldsState() {
    const currentStepElement = steps[currentStep];

    if (currentStep === 3) {
      const inputs = currentStepElement.querySelectorAll('.form__input input');
      inputs.forEach(input => {
        if (input.value.trim()) {
          input.classList.remove('_form-error');
          if (input.parentElement) {
            input.parentElement.classList.remove('_form-error');
            input.parentElement.classList.add('_form-success');
          }
        } else {
          if (input.parentElement) {
            input.parentElement.classList.remove('_form-success');
          }
        }
      });
    }
  }

  function clearErrorsOnCurrentStep() {
    const currentStepElement = steps[currentStep];

    if (currentStep === 3) {
      clearContactErrors(currentStepElement);
    }

    const errors = currentStepElement.querySelectorAll('._form-error');
    errors.forEach(error => {
      error.classList.remove('_form-error');
      if (error.parentElement) error.parentElement.classList.remove('_form-error');
    });
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      const quizBlock = document.querySelector('.block-quiz');
      if (quizBlock) {
        quizBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function submitQuiz(e) {
    if (e) e.preventDefault();

    clearErrorsOnCurrentStep();

    if (!isCurrentStepValid()) {
      return;
    }

    // Собираем данные напрямую из формы
    const quizData = {};

    // Шаг 1: location (значение радио-кнопки)
    const locationRadio = document.querySelector('.step1 input[name="location"]:checked');
    if (locationRadio && locationRadio.value) {
      quizData.location = locationRadio.value;
    }

    // Шаг 2: size
    const sizeInput = document.querySelector('.step2 input[name="size"]');
    if (sizeInput && sizeInput.value.trim()) {
      quizData.size = sizeInput.value.trim();
    }

    // Шаг 3: facade
    const facadeRadio = document.querySelector('.step3 input[name="facade"]:checked');
    if (facadeRadio && facadeRadio.value) {
      quizData.facade = facadeRadio.value;
    }

    const telegramInput = document.querySelector('.step4 input[name="telegram"]');
    if (telegramInput && telegramInput.value.trim()) {
      quizData.telegram = telegramInput.value.trim();
    }

    const maxNameInput = document.querySelector('.step4 input[name="max_name"]');
    if (maxNameInput && maxNameInput.value.trim()) {
      quizData.max_name = maxNameInput.value.trim();
    }

    const phoneInput = document.querySelector('.step4 input[name="phone"]');
    if (phoneInput && phoneInput.value.trim()) {
      quizData.phone = phoneInput.value.trim();
    }

    sendQuizData(quizData);
  }

  async function sendQuizData(quizData) {
    const submitBtn = document.querySelector('.block-quiz__steps button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Отправить';
    if (submitBtn) {
      submitBtn.textContent = 'Отправка...';
      submitBtn.disabled = true;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(quizData)) {
      if (value) {
        formData.append(key, value);
      }
    }

    formData.append('button_subject', 'Заявка с квиза - расчет шкафа');

    try {
      const response = await fetch('send-quiz.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {

        if (quizSteps && quizSend) {
          quizSteps.style.display = 'none';
          quizSend.style.display = 'block';

          setTimeout(() => {
            quizSend.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      } else {
        throw new Error(result.message || 'Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  }

  function addRealTimeValidation() {
    const allRadios = document.querySelectorAll('.options__input');
    allRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        hideRadioError(this);
        this.classList.remove('_form-error');
        if (this.parentElement) this.parentElement.classList.remove('_form-error');
      });
    });

    const step2Inputs = document.querySelectorAll('.step2 input');
    step2Inputs.forEach(input => {
      input.addEventListener('input', function () {
        if (this.value.trim()) {
          this.classList.remove('_form-error');
          if (this.parentElement) this.parentElement.classList.remove('_form-error');
        }
      });
    });

    const step4Inputs = document.querySelectorAll('.step4 input');
    step4Inputs.forEach(input => {
      input.addEventListener('input', function () {
        const step4Element = document.querySelector('.step4');
        if (step4Element && currentStep === 3) {
          const atLeastOneFilled = isAtLeastOneFieldFilled(step4Element);

          if (this.value.trim()) {
            this.classList.remove('_form-error');
            if (this.parentElement) {
              this.parentElement.classList.remove('_form-error');
              this.parentElement.classList.add('_form-success');
            }

            if (atLeastOneFilled) {
              clearContactErrors(step4Element);
            }
          } else {
            if (this.parentElement) {
              this.parentElement.classList.remove('_form-success');
            }
            if (!atLeastOneFilled && !hasAnyContactFieldFilled()) {
              showContactError(step4Element);
            }
          }
        }
      });
    });
  }

  function hasAnyContactFieldFilled() {
    const telegramInput = document.querySelector('.step4 input[name="telegram"]');
    const maxNameInput = document.querySelector('.step4 input[name="max_name"]');
    const phoneInput = document.querySelector('.step4 input[name="phone"]');

    return (telegramInput && telegramInput.value.trim()) ||
      (maxNameInput && maxNameInput.value.trim()) ||
      (phoneInput && phoneInput.value.trim());
  }

  function addEnterKeyHandler() {
    const inputs = document.querySelectorAll('.step2 input, .step4 input');
    inputs.forEach(input => {
      input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (currentStep === steps.length - 1) {
            submitQuiz(e);
          } else {
            nextStep();
          }
        }
      });
    });
  }

  nextButtons.forEach(button => {
    button.addEventListener('click', nextStep);
  });

  prevButtons.forEach(button => {
    button.addEventListener('click', prevStep);
  });

  if (submitButton) {
    submitButton.addEventListener('click', submitQuiz);
  }

  showStep(0);

  if (quizSend) {
    quizSend.style.display = 'none';
  }

  addRealTimeValidation();
  addEnterKeyHandler();

  const form = document.querySelector('.block-quiz__steps');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (currentStep === steps.length - 1) {
        submitQuiz(e);
      }
    });
  }
}

//========================================================================================================================================================

//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.previousMenuState = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
  }
  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        this.previousMenuState = document.documentElement.classList.contains('menu-open');
        if (this.previousMenuState) {
          if (typeof menuClose === 'function') {
            menuClose();
          } else {
            document.documentElement.classList.remove("menu-open");
            if (typeof bodyUnlock === 'function') bodyUnlock();
          }
        }
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        const videoElement = this.targetOpen.element.querySelector("video");
        if (videoElement) {
          videoElement.muted = true;
          videoElement.currentTime = 0;
          videoElement.play().catch((e => console.error("Autoplay error:", e)));
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: {
            popup: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: {
            popup: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
    if (!this.isOpen || !bodyLockStatus) return;
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: {
        popup: this
      }
    }));
    if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
      if (this.previousMenuState) {
        if (typeof menuOpen === 'function') {
          menuOpen();
        } else {
          document.documentElement.classList.add("menu-open");
          if (typeof bodyLock === 'function') bodyLock();
        }
      }
    }
    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: {
        popup: this
      }
    }));
    this.options.on.afterClose(this);
  }
  _getHash() {
    if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState("", "", this.hash);
  }
  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
modules_flsModules.popup = new Popup({});

function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

//========================================================================================================================================================

const iconMenu = document.querySelector('.header-top__burger');
const headerBody = document.querySelector('.header-menu');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();

    document.documentElement.classList.toggle("menu-open");
  });

  document.addEventListener('click', function (e) {
    const isClickInsideHeaderBody = headerBody && headerBody.contains(e.target);
    const isClickOnMenuIcon = e.target === iconMenu || iconMenu.contains(e.target);

    if (!isClickInsideHeaderBody && !isClickOnMenuIcon) {
      document.documentElement.classList.remove("menu-open");
    }
  });
}

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('_header-scroll');
      document.documentElement.classList.add('header-scroll');
    } else {
      header.classList.remove('_header-scroll');
      document.documentElement.classList.remove('header-scroll');
    }
  });
}

//========================================================================================================================================================

//Прокрутка к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);

  if (!targetBlockElement) {
    console.warn(`Element ${targetBlock} not found`);
    return;
  }

  let headerItem = '';
  let headerItemHeight = 0;

  if (noHeader) {
    headerItem = 'header.header';
    const headerElement = document.querySelector(headerItem);
    if (headerElement) {
      if (!headerElement.classList.contains('_header-scroll')) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add('_header-scroll');
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove('_header-scroll');
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }
  }

  if (document.documentElement.classList.contains("menu-open")) {
    if (typeof menuClose === 'function') {
      menuClose();
    }
  }

  if (typeof SmoothScroll !== 'undefined') {
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    };
    new SmoothScroll().animateScroll(targetBlockElement, '', options);
  } else {
    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + window.scrollY;

    if (headerItemHeight) {
      targetBlockElementPosition -= headerItemHeight;
    }

    if (offsetTop) {
      targetBlockElementPosition -= offsetTop;
    }

    window.scrollTo({
      top: targetBlockElementPosition,
      behavior: "smooth"
    });
  }
};
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);

  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      const gotoLink = targetElement.closest('[data-goto]');

      if (gotoLink) {
        const gotoLinkSelector = gotoLink.dataset.goto || '';
        const noHeader = gotoLink.hasAttribute('data-goto-header');
        const gotoSpeed = gotoLink.dataset.gotoSpeed ? parseInt(gotoLink.dataset.gotoSpeed) : 500;
        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;

        if (window.modules_flsModules && modules_flsModules.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`)?.closest('[data-fp-section]');
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;

          if (fullpageSectionId !== null) {
            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
            if (document.documentElement.classList.contains("menu-open") && typeof menuClose === 'function') {
              menuClose();
            }
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }

        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;

      if (targetElement.dataset.watch === 'navigator') {
        document.querySelectorAll('[data-goto]._navigator-active').forEach(el => {
          el.classList.remove('_navigator-active');
        });

        const navigatorLinks = findNavigatorLinks(targetElement);
        navigatorLinks.forEach(link => {
          if (entry.isIntersecting) {
            link.classList.add('_navigator-active');
          } else {
            link.classList.remove('_navigator-active');
          }
        });
      }
    }
  }

  function findNavigatorLinks(element) {
    const links = [];

    if (element.id) {
      const idLinks = document.querySelectorAll(`[data-goto="#${element.id}"]`);
      links.push(...idLinks);
    }

    if (element.classList.length) {
      element.classList.forEach(className => {
        const classLinks = document.querySelectorAll(`[data-goto=".${className}"]`);
        links.push(...classLinks);
      });
    }

    return links;
  }
}
pageNavigation();

//========================================================================================================================================================

//Наблюдатель
class ScrollWatcher {
  constructor(props) {
    let defaultConfig = {
      logging: true,
    }
    this.config = Object.assign(defaultConfig, props);
    this.observer;
    !document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
  }
  scrollWatcherUpdate() {
    this.scrollWatcherRun();
  }
  scrollWatcherRun() {
    document.documentElement.classList.add('watcher');
    this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
  }
  scrollWatcherConstructor(items) {
    if (items.length) {
      let uniqParams = uniqArray(Array.from(items).map(function (item) {
        if (item.dataset.watch === 'navigator' && !item.dataset.watchThreshold) {
          let valueOfThreshold;
          if (item.clientHeight > 2) {
            valueOfThreshold =
              window.innerHeight / 2 / (item.clientHeight - 1);
            if (valueOfThreshold > 1) {
              valueOfThreshold = 1;
            }
          } else {
            valueOfThreshold = 1;
          }
          item.setAttribute(
            'data-watch-threshold',
            valueOfThreshold.toFixed(2)
          );
        }
        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
      }));
      uniqParams.forEach(uniqParam => {
        let uniqParamArray = uniqParam.split('|');
        let paramsWatch = {
          root: uniqParamArray[0],
          margin: uniqParamArray[1],
          threshold: uniqParamArray[2]
        }
        let groupItems = Array.from(items).filter(function (item) {
          let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
          let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
          let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
          if (
            String(watchRoot) === paramsWatch.root &&
            String(watchMargin) === paramsWatch.margin &&
            String(watchThreshold) === paramsWatch.threshold
          ) {
            return item;
          }
        });

        let configWatcher = this.getScrollWatcherConfig(paramsWatch);

        this.scrollWatcherInit(groupItems, configWatcher);
      });
    }
  }
  getScrollWatcherConfig(paramsWatch) {
    let configWatcher = {}
    if (document.querySelector(paramsWatch.root)) {
      configWatcher.root = document.querySelector(paramsWatch.root);
    }
    configWatcher.rootMargin = paramsWatch.margin;
    if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
      return
    }
    if (paramsWatch.threshold === 'prx') {
      paramsWatch.threshold = [];
      for (let i = 0; i <= 1.0; i += 0.005) {
        paramsWatch.threshold.push(i);
      }
    } else {
      paramsWatch.threshold = paramsWatch.threshold.split(',');
    }
    configWatcher.threshold = paramsWatch.threshold;

    return configWatcher;
  }
  scrollWatcherCreate(configWatcher) {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        this.scrollWatcherCallback(entry, observer);
      });
    }, configWatcher);
  }
  scrollWatcherInit(items, configWatcher) {
    this.scrollWatcherCreate(configWatcher);
    items.forEach(item => this.observer.observe(item));
  }
  scrollWatcherIntersecting(entry, targetElement) {
    if (entry.isIntersecting) {
      !targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
    } else {
      targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
    }
  }
  scrollWatcherOff(targetElement, observer) {
    observer.unobserve(targetElement);
  }
  scrollWatcherCallback(entry, observer) {
    const targetElement = entry.target;
    this.scrollWatcherIntersecting(entry, targetElement);
    targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
    document.dispatchEvent(new CustomEvent("watcherCallback", {
      detail: {
        entry: entry
      }
    }));
  }
}
modules_flsModules.watcher = new ScrollWatcher({});