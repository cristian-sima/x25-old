
import React from "react";
import classnames from "classnames";

const CifField = (props : any) => {
  const { input, hasRequested, isWaiting, isGood, findDetailsByCif, icon, handleKeyUp,
    onRegisterRef, right, left, foundData } = props;

  const { name } = input;
  const { error, submitting, touched } = props.meta;

  return (

    <div className="form-group row">
      <label
        className={`text-md-right
      form-control-label
      form-control-lg ${left ? left : "col-md-3"}`} htmlFor={name}>
        {"C.I.F "}
      </label>
      <div className={right ? right : "col-md-9 col-lg-6"}>
        <div className="input-group">
          <input
            {...input}
            aria-label="Cod de identificare fiscală"
            className={classnames("form-control form-control-lg hide-arrrow", {
              "is-valid"   : isGood,
              "is-invalid" : touched && error,
            })}
            disabled={submitting && !(submitting && isWaiting)}
            id={name}
            name={name}
            onKeyUp={handleKeyUp}
            placeholder="ex. 51584214"
            ref={onRegisterRef}
            type="tel"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-lg"
              disabled={submitting || isWaiting}
              onClick={findDetailsByCif(input.value)}
              title="Preia datele de pe Internet"
              type="button">
              <i className={`fa ${icon ? icon : "fa-search"}`} />
            </button>
          </div>
        </div>
        <div className="col small">
          {
            isWaiting ? (
              <span>
                <span className="spinner-border spinner-border-sm text-primary me-2" role="status" />
                {"Preluare automată date..."}
              </span>
            ) : (
              hasRequested ? (
                foundData ? (
                  <div className="text-success">
                    <i className="fa fa-check me-2" />
                    {"Datele firmei au fost preluate automat"}
                  </div>
                ) : (
                  <div className="text-warning">
                    {"Nu se pot prelua automat datele firmei"}
                  </div>
                )
              ) : " "
            )
          }
        </div>
        <div className="invalid-feedback is-valid">
          { touched && error ? error : null }
        </div>
      </div>
    </div>
  );
};

export default CifField;
