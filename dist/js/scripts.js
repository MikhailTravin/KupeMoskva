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
        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');
        const response = await fetch(formAction, {
          method: formMethod,
          body: formData
        });
        if (response.ok) {
          let responseResult = await response.json();
          form.classList.remove('_sending');
          formSent(form, responseResult);
        } else {
          alert("Помилка");
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
      const parent = input.closest('.form__input');
      if (parent) {
        parent.classList.remove('filled');
      }
    });

    setTimeout(() => {
      if (modules_flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? modules_flsModules.popup.open(popup) : null;
      }
    }, 0);

    formValidate.formClean(form);
  }
}
formSubmit();

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
    let currentValue = '';

    if (selectedOptions.values.length > 0 && selectedOptions.elements[0]) {
      placeholderText = selectedOptions.elements[0].textContent.trim();
      const optionValue = selectedOptions.elements[0].value;
      const optionText = selectedOptions.elements[0].textContent.trim();

      if (optionValue !== optionText && optionValue !== String(selectedOptions.elements[0].getAttribute('value'))) {
        currentValue = optionValue;
      } else {
        currentValue = '';
      }
    } else {
      placeholderText = originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '';
      currentValue = '';
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
          <input type="text" class="${this.selectClasses.classSelectContent}${customClass}${telephoneClass}" value="${this.escapeHtml(currentValue)}" placeholder="${this.escapeHtml(placeholderText)}">
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

    contentInput.addEventListener('input', function (e) {
      if (isUpdating) return;

      const newValue = this.value;

      if (!isUpdating) {
        isUpdating = true;

        originalSelect.value = newValue;

        if (newValue.trim()) {
          let existingOption = Array.from(originalSelect.options).find(option => option.value === newValue);

          if (!existingOption && !originalSelect.querySelector(`option[value="${newValue}"]`)) {
            const tempOption = document.createElement('option');
            tempOption.value = newValue;
            tempOption.textContent = newValue;
            tempOption.selected = true;
            originalSelect.appendChild(tempOption);
          } else if (existingOption) {
            existingOption.selected = true;
          }
        } else {
          originalSelect.selectedIndex = -1;
        }

        _this.setSelectChange(originalSelect);
        isUpdating = false;
      }

      const selectedOptions = _this.getSelectedOptionsData(originalSelect);
      if (selectedOptions.elements.length > 0 && selectedOptions.elements[0]) {
        const newIcon = _this.getOptionIcon(selectedOptions.elements[0]);
        const arrowSpan = selectItem.querySelector(`.${_this.selectClasses.classSelectArrow}`);
        if (arrowSpan && newIcon) {
          arrowSpan.innerHTML = `<span class="${_this.selectClasses.classSelectIcon}">${newIcon}</span>`;
        }
      }
    });

    contentInput.addEventListener('blur', function () {
      if (isUpdating) return;

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
        if (selectedOptions.elements.length > 0) {
          const option = selectedOptions.elements[0];
          const optionText = option.textContent.trim();

          contentInput.placeholder = optionText;

          if (option.value !== optionText && !option.value.match(/^\d+$/)) {
            contentInput.value = option.value;
          } else {
            contentInput.value = '';
          }
        } else {
          contentInput.value = '';
          contentInput.placeholder = '';
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
          if (!originalSelect.hasAttribute('data-show-selected')) {
            setTimeout(() => {
              if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
                selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
              }
              optionItem.hidden = true;
            }, this.config.speed);
          }
          originalSelect.value = optionItem.dataset.value;
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

// Добавляем функционал для квиза с интеграцией существующей валидации
document.addEventListener('DOMContentLoaded', function () {
  // Получаем все элементы квиза
  const quizSteps = document.querySelector('.block-quiz__steps');
  const quizSend = document.querySelector('.block-quiz__send');
  const steps = document.querySelectorAll('.block-quiz__step');
  const nextButtons = document.querySelectorAll('.btn-quiz-next');
  const prevButtons = document.querySelectorAll('.btn-quiz-prev');
  const submitButton = document.querySelector('.block-quiz__steps button[type="submit"]');

  let currentStep = 0;

  // Функция для отображения только текущего шага
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.style.display = index === stepIndex ? 'block' : 'none';
    });
  }

  // Функция для проверки валидности текущего шага
  function isCurrentStepValid() {
    const currentStepElement = steps[currentStep];

    // Для 4-го шага (индекс 3) - специальная проверка: хотя бы одно поле заполнено
    if (currentStep === 3) {
      return isAtLeastOneFieldFilled(currentStepElement);
    }

    // Для остальных шагов стандартная проверка
    const requiredItems = currentStepElement.querySelectorAll('[data-required]');

    if (requiredItems.length === 0) return true;

    let isValid = true;

    requiredItems.forEach(item => {
      // Для radio кнопок
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
      // Для текстовых полей на 2-м шаге
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

  // Функция для проверки 4-го шага (хотя бы одно поле заполнено)
  function isAtLeastOneFieldFilled(stepElement) {
    const inputs = stepElement.querySelectorAll('.form__input input');
    let atLeastOneFilled = false;

    // Очищаем предыдущие ошибки
    clearContactErrors(stepElement);

    // Проверяем каждое поле
    inputs.forEach(input => {
      if (input.value.trim()) {
        atLeastOneFilled = true;
        // Убираем ошибку если поле заполнено
        input.classList.remove('_form-error');
        if (input.parentElement) {
          input.parentElement.classList.remove('_form-error');
        }
      }
    });

    // Если ни одно поле не заполнено, показываем ошибку
    if (!atLeastOneFilled) {
      showContactError(stepElement);
    }

    return atLeastOneFilled;
  }

  // Показать ошибку для контактных полей
  function showContactError(stepElement) {
    const formInputs = stepElement.querySelectorAll('.form__input');
    formInputs.forEach(formInput => {
      if (!formInput.classList.contains('_form-error')) {
        formInput.classList.add('_form-error');
      }
    });

    // Добавляем общее сообщение об ошибке если его нет
    const formInputsContainer = stepElement.querySelector('.form__inputs');
    if (formInputsContainer && !formInputsContainer.querySelector('.form__error-message')) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'form__error-message';
      errorMessage.textContent = 'Пожалуйста, заполните хотя бы одно поле (Telegram, Max или Телефон)';
      errorMessage.style.color = '#ff0000';
      errorMessage.style.fontSize = '12px';
      errorMessage.style.marginTop = '10px';
      errorMessage.style.marginBottom = '10px';
      formInputsContainer.insertAdjacentElement('afterend', errorMessage);
    }
  }

  // Очистить ошибки контактных полей
  function clearContactErrors(stepElement) {
    const formInputs = stepElement.querySelectorAll('.form__input');
    formInputs.forEach(formInput => {
      formInput.classList.remove('_form-error');
      const input = formInput.querySelector('input');
      if (input) {
        input.classList.remove('_form-error');
      }
    });

    const errorMessage = stepElement.querySelector('.form__error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  // Показать ошибку для radio группы
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

  // Скрыть ошибку для radio группы
  function hideRadioError(radioItem) {
    const optionsBlock = radioItem.closest('.options');
    if (optionsBlock) {
      const errorDiv = optionsBlock.parentElement.querySelector('.form__error');
      if (errorDiv) errorDiv.remove();
    }
  }

  // Функция для следующего шага
  function nextStep() {
    // Очищаем старые ошибки на текущем шаге
    clearErrorsOnCurrentStep();

    if (isCurrentStepValid()) {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
        // Обновляем состояние полей при переходе (очищаем временные ошибки)
        updateFieldsState();
        // Прокручиваем к началу квиза
        const quizBlock = document.querySelector('.block-quiz');
        if (quizBlock) {
          quizBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Показываем сообщение об ошибке без alert
      const currentStepElement = steps[currentStep];
      const firstError = currentStepElement.querySelector('._form-error, .form__error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  // Обновить состояние полей (убрать временные ошибки)
  function updateFieldsState() {
    const currentStepElement = steps[currentStep];

    // Для 4-го шага проверяем заполненные поля
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

  // Очистка ошибок на текущем шаге
  function clearErrorsOnCurrentStep() {
    const currentStepElement = steps[currentStep];

    // Для 4-го шага особая очистка
    if (currentStep === 3) {
      clearContactErrors(currentStepElement);
    }

    const errors = currentStepElement.querySelectorAll('._form-error');
    errors.forEach(error => {
      error.classList.remove('_form-error');
      if (error.parentElement) error.parentElement.classList.remove('_form-error');
    });

    const errorMessages = currentStepElement.querySelectorAll('.form__error:not(.form__error-message)');
    errorMessages.forEach(msg => msg.remove());
  }

  // Функция для предыдущего шага
  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      // Прокручиваем к началу квиза
      const quizBlock = document.querySelector('.block-quiz');
      if (quizBlock) {
        quizBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // Функция для отправки данных
  function submitQuiz(e) {
    if (e) e.preventDefault();

    // Проверяем последний шаг
    clearErrorsOnCurrentStep();

    if (!isCurrentStepValid()) {
      const currentStepElement = steps[currentStep];
      const firstError = currentStepElement.querySelector('._form-error, .form__error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Собираем все данные из квиза
    const quizData = {
      location: null,
      size: null,
      facade: null,
      telegram: null,
      name: null,
      phone: null
    };

    // Собираем данные с первого шага (где будет шкаф)
    const selectedLocation = document.querySelector('.step1 input[type="radio"]:checked');
    if (selectedLocation) {
      quizData.location = selectedLocation.parentElement.querySelector('.options__text')?.innerText;
      quizData.locationValue = selectedLocation.value;
    }

    // Собираем данные со второго шага (размеры)
    const sizeInput = document.querySelector('.step2 .size');
    if (sizeInput && sizeInput.value) {
      quizData.size = sizeInput.value;
    }

    // Собираем данные с третьего шага (фасады)
    const selectedFacade = document.querySelector('.step3 input[type="radio"]:checked');
    if (selectedFacade) {
      quizData.facade = selectedFacade.parentElement.querySelector('.options__text')?.innerText;
      quizData.facadeValue = selectedFacade.value;
    }

    // Собираем данные с четвертого шага (контакты) - только заполненные поля
    const telegramInput = document.querySelector('.step4 input[placeholder="Telegram"]');
    const nameInput = document.querySelector('.step4 input[placeholder="Max"]');
    const phoneInput = document.querySelector('.step4 .telephone');

    if (telegramInput && telegramInput.value.trim()) quizData.telegram = telegramInput.value;
    if (nameInput && nameInput.value.trim()) quizData.name = nameInput.value;
    if (phoneInput && phoneInput.value.trim()) quizData.phone = phoneInput.value;

    console.log('Отправленные данные:', quizData);

    // Показываем анимацию отправки
    if (quizSteps && quizSend) {

      setTimeout(() => {
        quizSteps.style.display = 'none';
        quizSend.style.display = 'block';
      }, 300);
    }

    // Здесь можно добавить отправку на сервер через AJAX
    // sendQuizData(quizData);
  }

  // Добавляем обработчики событий для полей ввода в реальном времени
  function addRealTimeValidation() {
    // Для radio кнопок
    const allRadios = document.querySelectorAll('.options__input');
    allRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        hideRadioError(this);
        this.classList.remove('_form-error');
        if (this.parentElement) this.parentElement.classList.remove('_form-error');
      });
    });

    // Для полей на 2-м шаге
    const step2Inputs = document.querySelectorAll('.step2 input');
    step2Inputs.forEach(input => {
      input.addEventListener('input', function () {
        if (this.value.trim()) {
          this.classList.remove('_form-error');
          if (this.parentElement) this.parentElement.classList.remove('_form-error');
        }
      });
    });

    // Для полей на 4-м шаге - динамическая проверка
    const step4Inputs = document.querySelectorAll('.step4 input');
    step4Inputs.forEach(input => {
      input.addEventListener('input', function () {
        const step4Element = document.querySelector('.step4');
        if (step4Element && currentStep === 3) {
          const atLeastOneFilled = isAtLeastOneFieldFilled(step4Element);

          // Визуально обновляем статус полей
          if (this.value.trim()) {
            this.classList.remove('_form-error');
            if (this.parentElement) {
              this.parentElement.classList.remove('_form-error');
              this.parentElement.classList.add('_form-success');
            }

            // Если хотя бы одно поле заполнено, убираем ошибки со всех полей
            if (atLeastOneFilled) {
              clearContactErrors(step4Element);
            }
          } else {
            if (this.parentElement) {
              this.parentElement.classList.remove('_form-success');
            }
            // Если это было последнее заполненное поле, показываем ошибку
            if (!atLeastOneFilled && !hasAnyContactFieldFilled()) {
              showContactError(step4Element);
            }
          }
        }
      });
    });
  }

  // Проверка, заполнено ли хотя бы одно контактное поле
  function hasAnyContactFieldFilled() {
    const telegramInput = document.querySelector('.step4 input[placeholder="Telegram"]');
    const nameInput = document.querySelector('.step4 input[placeholder="Max"]');
    const phoneInput = document.querySelector('.step4 .telephone');

    return (telegramInput && telegramInput.value.trim()) ||
      (nameInput && nameInput.value.trim()) ||
      (phoneInput && phoneInput.value.trim());
  }

  // Добавляем обработчики для Enter
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

  // Навешиваем обработчики событий
  nextButtons.forEach(button => {
    button.addEventListener('click', nextStep);
  });

  prevButtons.forEach(button => {
    button.addEventListener('click', prevStep);
  });

  if (submitButton) {
    submitButton.addEventListener('click', submitQuiz);
  }

  // Инициализация
  showStep(0);

  if (quizSend) {
    quizSend.style.display = 'none';
  }

  // Добавляем дополнительные обработчики
  addRealTimeValidation();
  addEnterKeyHandler();

  // Убираем стандартную отправку формы
  const form = document.querySelector('.block-quiz__steps');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (currentStep === steps.length - 1) {
        submitQuiz(e);
      }
    });
  }
});